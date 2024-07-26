import sys, os
import time
from datetime import timedelta
import numpy as np
import cv2
from matplotlib import pyplot as plt

import ailia

# import original modules
sys.path.append('/hone/corwdm_python/flask_project/utils')
from utils.arg_utils import get_base_parser, update_parser, get_savepath  # noqa: E402
from utils.model_util import check_and_download_models  # noqa: E402
from utils.detector_utils import load_image  # noqa: E402C
from utils.webcamera_utils import get_capture, get_writer  # noqa: E402

# logger
from logging import getLogger
logger = getLogger(__name__)


# ======================
# Parameters
# ======================

WEIGHT_ALEXNET_PATH = 'AlexNet.onnx'
WEIGHT_VGG_PATH = 'VGG.onnx'
WEIGHT_VGG_DECODER_PATH = 'VGG_DECODER.onnx'
WEIGHT_RESNET50_PATH = 'ResNet50.onnx'
WEIGHT_RESNET101_PATH = 'ResNet101.onnx'
WEIGHT_CSRNET_PATH = 'CSRNet.onnx'
WEIGHT_SANET_PATH = 'SANet.onnx'
MODEL_ALEXNET_PATH = 'AlexNet.onnx.prototxt'
MODEL_VGG_PATH = 'VGG.onnx.prototxt'
MODEL_VGG_DECODER_PATH = 'VGG_DECODER.onnx.prototxt'
MODEL_RESNET50_PATH = 'ResNet50.onnx.prototxt'
MODEL_RESNET101_PATH = 'ResNet101.onnx.prototxt'
MODEL_CSRNET_PATH = 'CSRNet.onnx.prototxt'
MODEL_SANET_PATH = 'SANet.onnx.prototxt'
REMOTE_PATH = \
    'https://storage.googleapis.com/ailia-models/c-3-framework/'

IMAGE_PATH = 'demo.jpg'
SAVE_IMAGE_PATH = './result/result.png'

MAX_IMAGE_WIDTH = 1024  # you can increase this value if you have an enough vram

# ======================
# Arguemnt Parser Config
# ======================

parser = get_base_parser(
    'C-3-Framework model', IMAGE_PATH, SAVE_IMAGE_PATH
)
parser.add_argument(
    '-m', '--model', type=str, default='resnet50',
    choices=(
        'alexnet', 'vgg', 'vgg_decoder', 'resnet50', 'resnet101', 'csrnet', 'sanet',
    ),
    help='choice model'
)
args = update_parser(parser)


# ======================
# Secondaty Functions
# ======================


def preprocess(img):
    img = img.astype(np.float32) / 255

    # normalize
    mean = np.array([0.452016860247, 0.447249650955, 0.431981861591])
    std = np.array([0.23242045939, 0.224925786257, 0.221840232611])
    mean = np.float64(mean.reshape(1, -1))
    stdinv = 1 / np.float64(std.reshape(1, -1))
    cv2.subtract(img, mean, img)  # inplace
    cv2.multiply(img, stdinv, img)  # inplace

    img = img.transpose(2, 0, 1)
    img = np.expand_dims(img, axis=0)

    return img


"""
 1. MethodName: get_congrestion_level
 2. ClassName : analyze_chunk.py
 3. Comment   : 인원수에 따른 밀집도 구분
 4. 작성자    : san
 5. 작성일    : 2024. 07. 20

 param : str : pred, str : place
 return : str : 혼잡도
"""
def get_congrestion_level(pred, place):
    if '서울역' in place :
        if pred < 10:
            return '여유'
        elif pred < 25:
            return '보통'
        elif pred < 50:
            return '혼잡'
        else:
            return '매우혼잡'

"""
 1. MethodName: predict
 2. ClassName : analyze_chunk.py
 3. Comment   : 사람 수 계산
 4. 작성자    : san
 5. 작성일    : 2024. 07. 20

 param : img, net
 return : pred_map
"""
def predict(img, net):
    img = preprocess(img)

    net.set_input_shape(img.shape)
    pred_map = net.predict({'imgs': img})[0]
    pred_map = pred_map[0, 0, :, :]

    return pred_map

"""
 1. MethodName: recognize_from_video
 2. ClassName : analyze_chunk.py
 3. Comment   : 사람 수 계산 및 밀집도 구분
 4. 작성자    : san
 5. 작성일    : 2024. 07. 20

 param : str : filepath, model : net, str : place
 return : list : significant
"""
def recognize_from_video(filepath, net, place):
    capture = get_capture(filepath)

    f_h = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
    f_w = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH))

    if f_w>MAX_IMAGE_WIDTH:
        f_w, f_h = int(MAX_IMAGE_WIDTH), int(MAX_IMAGE_WIDTH*f_h/f_w)

    significant = []

    if not capture.isOpened(): 
        print(f"Error: Unable to open video file")
    
    fps = capture.get(cv2.CAP_PROP_FPS)
    frame_counter = 0

    while capture.isOpened():
        ret, frame = capture.read()
        if not ret:
            break
        frame_counter += 1
        if frame_counter % 10 != 0:
            continue

        # 현재 프레임의 timestamp(초 단위)
        timestamp = round(frame_counter / fps, 2)

        frame = cv2.resize(frame, (f_w,f_h))
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        pred_map = predict(frame, net)
        pred = np.sum(pred_map) / 100.0
        pred_map = pred_map / np.max(pred_map + 1e-20)

        logger.info("people count predict : "+str(pred))

        # 사람수를 기준으로 밀집도 구분
        cLevel = get_congrestion_level(pred, place)
        logger.info(f"cLevel : {cLevel}" )
        
        significant.append((timestamp, cLevel))
        
    capture.release()
    
    logger.info('Script finished successfully.')
    return significant


"""
 1. MethodName: countPeople
 2. ClassName : analyze_chunk.py
 3. Comment   : 밀집도 파악
 4. 작성자    : san
 5. 작성일    : 2024. 07. 20

 param : str : file_path, model : str : place
 return : list : significant_time
"""
def countPeople(filepath, place):
    dic_model = {
        'resnet50': (WEIGHT_RESNET50_PATH, MODEL_RESNET50_PATH),
    }
    # 예측에 사용할 모델 정의
    weight_path, model_path = dic_model['resnet50']

    # 모델과 가중치 로드
    check_and_download_models(weight_path, model_path, REMOTE_PATH)

    # 분석에 사용할 모델 정의
    net = ailia.Net(model_path, weight_path, env_id=0)
    
    # 이상여부 판단 함수 수행
    significant_time = recognize_from_video(filepath, net, place)

    logger.info(f'significant_time : {significant_time}')
    
    return significant_time
