import os
os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"  # CUDA 장치 순서 설정
from tqdm import tqdm
import torch
import argparse
from PIL import Image
from torch.autograd import Variable
import numpy as np
from i3dpt import I3D
import math

def load_frame(frame_file):
    """
    주어진 프레임 파일을 로드하여 전처리하는 함수

    Args:
        frame_file (str): 프레임 파일 경로

    Returns:
        numpy.ndarray: 전처리된 프레임 데이터
    """
    data = Image.open(frame_file) 
    data = data.resize((340, 256), Image.Resampling.LANCZOS)  # 프레임 리사이징

    data = np.array(data)
    data = data.astype(float)
    data = (data * 2 / 255) - 1  # 데이터 정규화

    assert(data.max() <= 1.0)
    assert(data.min() >= -1.0)

    return data

def five_crop_data(data):
    """
    주어진 데이터를 오버샘플링하여 5개의 크롭을 생성하는 함수

    Args:
        data (numpy.ndarray): 원본 데이터

    Returns:
        list: 오버샘플링된 데이터 리스트
    """
    data_1 = np.array(data[:, :, :224, :224, :])   # 좌상단
    data_2 = np.array(data[:, :, :224, -224:, :])  # 우상단
    data_3 = np.array(data[:, :, 16:240, 58:282, :])  # 중앙
    data_4 = np.array(data[:, :, -224:, :224, :])  # 좌하단
    data_5 = np.array(data[:, :, -224:, -224:, :]) # 우하단

    return [data_1, data_2, data_3, data_4, data_5]

def load_rgb_batch(frames_dir, rgb_files, frame_indices):
    """
    주어진 프레임 인덱스를 사용하여 RGB 배치를 로드하는 함수

    Args:
        frames_dir (str): 프레임 디렉토리 경로
        rgb_files (list): RGB 파일 리스트
        frame_indices (numpy.ndarray): 프레임 인덱스 배열

    Returns:
        numpy.ndarray: 로드된 배치 데이터
    """
    batch_data = np.zeros(frame_indices.shape + (256, 340, 3))
    for i in range(frame_indices.shape[0]):
        for j in range(frame_indices.shape[1]):
            batch_data[i, j, :, :, :] = load_frame(os.path.join(frames_dir, 
                                                                rgb_files[frame_indices[i][j]]))
    return batch_data

def forward_batch(b_data, net):
    """
    I3D 모델을 사용하여 배치 데이터를 전방향 계산하는 함수

    Args:
        b_data (numpy.ndarray): 배치 데이터
        net (I3D): I3D 모델 객체

    Returns:
        numpy.ndarray: 추출된 피처 데이터
    """
    b_data = b_data.transpose([0, 4, 1, 2, 3])
    b_data = torch.from_numpy(b_data)  # numpy 배열을 PyTorch 텐서로 변환
    with torch.no_grad():
        net.eval()
        b_data = Variable(b_data.cuda()).float()
        b_features = net(b_data, feature_layer=5)
    b_features = b_features[0].data.cpu().numpy()[:, :, 0, 0, 0]
    return b_features

def run(load_model, video_dir, output_dir, batch_size, task_id):
    """
    주어진 비디오 디렉토리에 대해 I3D 모델을 사용하여 피처를 추출하는 함수

    Args:
        load_model (str): 모델 파일 경로
        video_dir (str): 비디오 디렉토리 경로
        output_dir (str): 출력 디렉토리 경로
        batch_size (int): 배치 사이즈
        task_id (int): 태스크 ID
    """
    mode = 'rgb'
    chunk_size = 16
    frequency = 16
    sample_mode = 'oversample'
    video_name = video_dir.split("\\")[-1]
    assert(mode in ['rgb', 'flow'])
    assert(sample_mode in ['oversample', 'center_crop', 'resize'])
    save_file = '{}_{}.npy'.format(video_name, "i3d")
    if save_file in os.listdir(os.path.join(output_dir)):
        print("{} has been extracted".format(save_file))
        return

    # 모델 설정
    i3d = I3D(400, modality='rgb', dropout_prob=0, name='inception')
    i3d.eval()
    i3d.load_state_dict(torch.load(load_model))
    i3d.cuda()

    rgb_files = [i for i in os.listdir(video_dir) if i.endswith('jpg')]
    rgb_files.sort(key=lambda x: int(x.split("_")[1].split(".")[0]))
    frame_cnt = len(rgb_files)

    assert(frame_cnt > chunk_size)

    clipped_length = math.ceil(frame_cnt / chunk_size)
    copy_length = (clipped_length * frequency) - frame_cnt  # 마지막 청크의 시작점
    if copy_length != 0:
        copy_img = [rgb_files[frame_cnt-1]] * copy_length
        rgb_files = rgb_files + copy_img

    frame_indices = []  # 청크로 프레임을 나눔
    for i in range(clipped_length):
        frame_indices.append(
            [j for j in range(i * frequency, i * frequency + chunk_size)])

    frame_indices = np.array(frame_indices)
    chunk_num = frame_indices.shape[0]

    batch_num = int(np.ceil(chunk_num / batch_size))
    frame_indices = np.array_split(frame_indices, batch_num, axis=0)

    full_features = [[] for i in range(5)]

    for batch_id in tqdm(range(batch_num)):
        batch_data = load_rgb_batch(video_dir, rgb_files, 
                                    frame_indices[batch_id])
        batch_data_five_crop = five_crop_data(batch_data)
        for i in range(5):
            assert(batch_data_five_crop[i].shape[-2] == 224)
            assert(batch_data_five_crop[i].shape[-3] == 224)
            full_features[i].append(forward_batch(batch_data_five_crop[i], i3d))

    full_features = [np.concatenate(i, axis=0) for i in full_features]
    full_features = [np.expand_dims(i, axis=0) for i in full_features]
    full_features = np.concatenate(full_features, axis=0)
    np.save(os.path.join(output_dir, save_file), full_features)

    print('{} done: {} / {}, {}'.format(
        video_name, frame_cnt, clipped_length, full_features.shape))

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--mode', default="rgb", type=str)
    parser.add_argument('--load_model', default="model_rgb.pth", type=str)
    parser.add_argument('--input_dir', default="UCF_Crime_Frames", type=str)
    parser.add_argument('--output_dir', default="UCF_ten", type=str)
    parser.add_argument('--batch_size', type=int, default=20)
    parser.add_argument('--sample_mode', default="oversample", type=str)
    parser.add_argument('--frequency', type=int, default=16)
    args = parser.parse_args()

    vid_list = []
    for videos in os.listdir(args.input_dir):
        for video in os.listdir(os.path.join(args.input_dir, videos)):
            save_file = '{}_{}.npy'.format(video, "i3d")
            if save_file in os.listdir(os.path.join(args.output_dir)):
                print("{} has been extracted".format(save_file))
            else:
                vid_list.append(os.path.join(args.input_dir, videos, video))
    print(vid_list)
    nums = len(vid_list)
    print("leave {} videos".format(nums))

    for i, video_dir in enumerate(vid_list):
        run(args.load_model, video_dir, args.output_dir, args.batch_size, i)
