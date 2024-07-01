import torch
import os
import argparse
# import wandb
from tqdm import tqdm
import numpy as np
import torch.utils.data as data
from models.normal_head import NormalHead
from models.translayer import Transformer
from dataset_loader import *
from utils import set_seed, save_best_record
from losses import loss_computer
from models import WSAD
from options import parse_args
import cv2
from sklearn.metrics import roc_auc_score, average_precision_score

def compute_metrics(outputs, labels):
    """
    주어진 출력값과 라벨에서 AUC와 Average Precision (AP)를 계산합니다.

    매개변수:
    outputs (Tensor): 모델의 예측 확률 또는 점수 (GPU 메모리에 있을 수 있음).
    labels (Tensor): 실제 라벨 (GPU 메모리에 있을 수 있음).

    반환값:
    tuple: AUC와 Average Precision 점수.
    """
    # GPU 텐서를 CPU로 복사하고 Numpy 배열로 변환합니다.
    outputs = outputs.cpu().numpy()
    labels = labels.cpu().numpy()
    
    auc = roc_auc_score(labels, outputs)
    ap = average_precision_score(labels, outputs)
    return auc, ap

def load_model(args):
    net = WSAD(args.len_feature, flag="Test", args=args)
    net = net.cuda()
    model_checkpoint = os.path.join(args.model_path, "xd_best.pkl")
    net.load_state_dict(torch.load(model_checkpoint))
    net.eval()
    return net

def load_test_data(args):
    test_loader = data.DataLoader(
        XDVideo(root_dir=args.root_dir, mode='Test', num_segments=args.num_segments, len_feature=args.len_feature),
        batch_size=1,  # Process one video at a time for visualization purposes
        shuffle=False, num_workers=args.num_workers,
        worker_init_fn=None)
    return test_loader

def load_frames_from_folder(folder_path):
    frames = []
    filenames = sorted(os.listdir(folder_path))
    for filename in filenames:
        img_path = os.path.join(folder_path, filename)
        img = cv2.imread(img_path)
        if img is not None:
            frames.append(img)
    return frames

def visualize_results(frames, scores):
    num_frames = len(frames)
    num_scores = len(scores)

    for i in range(num_frames):
        frame = frames[i]
        score_index = i // 16

        if score_index < num_scores:
            score = scores[score_index]
        else:
            score = 0  # 점수가 없을 경우 0으로 설정


        # Normalize score for visualization
        normalized_score = int(score * 255)

        # Convert frame to BGR format for OpenCV
        frame_bgr = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        # Display score on the frame
        cv2.putText(frame_bgr, f'Score: {score:.2f}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        # Display the frame
        cv2.imshow('Frame', frame_bgr)

        # Pause to create video effect, press any key to move to the next frame
        cv2.waitKey(17)

    # Release the video window
    cv2.destroyAllWindows()

def predict_and_visualize(net, test_loader):
    with torch.no_grad():
        for step, (inputs, labels) in enumerate(test_loader):
            inputs = inputs.cuda()
            outputs = net(inputs)
            # Assuming outputs contain scores for each frame
            scores = outputs.squeeze().cpu().numpy()

            # Load the video frames (assuming inputs is the video tensor)
            # video_frames = inputs.squeeze().cpu().numpy()  # Shape: (num_frames, height, width, channels)
            video_frames = load_frames_from_folder("C:/Users/ideal/Desktop/FinalProj/BN-WVAD/test_cut")
            # video_frames = load_frames_from_folder("C:/Users/ideal/Desktop/FinalProj/BN-WVAD/test_normal")

            # Visualize results
            visualize_results(video_frames, scores)
            break  # Remove this break to process all videos

if __name__ == "__main__":
    args = parse_args()
    if args.seed >= 0:
        set_seed(args.seed)
    
    # print(args)
    # Load model
    net = load_model(args)
    
    # Load test data
    test_loader = load_test_data(args)
    
    # Predict and visualize
    predict_and_visualize(net, test_loader)

# # Load the trained model and apply it to video data
# if __name__ == "__main__":
#     args = parse_args()
#     if args.debug:
#         import pdb; pdb.set_trace()

#     args.log_path = os.path.join(args.log_path, 'ckpts', 'xd', args.version)
#     args.model_path = os.path.join(args.model_path, 'ckpts', 'xd', args.version)
#     print(args.log_path)
#     # if not os.path.exists(args.log_path):
#     #     os.makedirs(args.log_path)
#     # if not os.path.exists(args.model_path):
#     #     os.makedirs(args.model_path)

#     # wandb.init(
#     #     project="BN-WVAD",
#     #     name=args.version,
#     #     config={
#     #         'optimization:lr': args.lr[0],
#     #         'optimization:iters': args.num_iters,
#     #         'dataset:dataset': 'xd-violence',
#     #         'model:kernel_sizes': args.kernel_sizes,
#     #         'model:channel_ratios': args.ratios,
#     #         'triplet_loss:abn_ratio_sample': args.ratio_sample,
#     #         'triplet_loss:abn_ratio_batch': args.ratio_batch,
#     #     },
#     #     settings=wandb.Settings(code_dir=os.path.dirname(os.path.abspath(__file__))),
#     #     save_code=True,
#     # )

#     worker_init_fn = None

#     if args.seed >= 0:
#         set_seed(args.seed)
#         worker_init_fn = np.random.seed(args.seed)
    
#     # Initialize model
#     net = WSAD(args.len_feature, flag="Test", args=args)
#     net = net.cuda()

#     # Load the trained model
#     model_checkpoint = os.path.join("ckpts/xd_best.pkl")
#     net.load_state_dict(torch.load(model_checkpoint))

#     # Set the model to evaluation mode
#     net.eval()

#     # Load test data
#     test_loader = data.DataLoader(
#         XDVideo(root_dir=args.root_dir, mode='Test', num_segments=args.num_segments, len_feature=args.len_feature),
#         batch_size=5,
#         shuffle=False, num_workers=args.num_workers,
#         worker_init_fn=worker_init_fn)

#     # Perform evaluation
#     test_info = {'step': [], 'AUC': [], 'AP': []}
    
#     with torch.no_grad():
#         for step, (inputs, labels) in enumerate(test_loader):
#             inputs = inputs.cuda()
#             outputs = net(inputs)
            
#             # Compute metrics (AUC, AP, etc.) here
#             # Assuming you have a function `compute_metrics` to calculate AUC and AP
#             auc, ap = compute_metrics(outputs, labels)
            
#             test_info['step'].append(step)
#             test_info['AUC'].append(auc)
#             test_info['AP'].append(ap)
            
#             print(f"Step: {step}, AUC: {auc}, AP: {ap}")

#     # Print or save the final evaluation results
#     print("Final Test Results:", test_info)