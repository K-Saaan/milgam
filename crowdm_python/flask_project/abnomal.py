import warnings
warnings.filterwarnings('ignore')

import platform
import cv2
import os
import json
import glob
from tqdm import tqdm
import random
import pandas as pd

import torch
import torch.nn as nn
import torch.nn.functional as F

import numpy as np

from transformers import AutoProcessor, CLIPVisionModel

from logging import getLogger
logger = getLogger(__name__)

# 환경에 맞는 device 설정
os_name = platform.system()
if os_name == 'Darwin' :  # MacOS 
    device = torch.device('mps' if torch.backends.mps.is_available() else 'cpu')
elif os_name == 'Windows' :
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
else :
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

device = torch.device('cpu')


"""
 1. ClassName : Learner
 2. Comment   : 이상행동 여부 판단을 위한 모델 정의
 3. 작성자    : san
 4. 작성일    : 2024. 07. 20
"""
class Learner(nn.Module):
    def __init__(self, input_dim=768, drop_p=0.0):
        super(Learner, self).__init__()
        self.classifier = nn.Sequential(
            nn.Linear(input_dim, 512),
            nn.ReLU(),
            nn.Dropout(0.6),
            nn.Linear(512, 32),
            nn.ReLU(),
            nn.Dropout(0.6),
            nn.Linear(32, 1),
            nn.Sigmoid()
        )
        self.drop_p = 0.6
        self.weight_init()
        self.vars = nn.ParameterList()

        for i, param in enumerate(self.classifier.parameters()):
            self.vars.append(param)

    def weight_init(self):
        for layer in self.classifier:
            if type(layer) == nn.Linear:
                nn.init.xavier_normal_(layer.weight)

    def forward(self, x, vars=None):
        if vars is None:
            vars = self.vars
        x = F.linear(x, vars[0], vars[1])
        x = F.relu(x)
        x = F.dropout(x, self.drop_p, training=self.training)
        x = F.linear(x, vars[2], vars[3])
        x = F.dropout(x, self.drop_p, training=self.training)
        x = F.linear(x, vars[4], vars[5])
        return torch.sigmoid(x)

"""
 1. MethodName: read_video
 2. ClassName : abnomal.py
 3. Comment   : 영상 편집 및 frame 확인
 4. 작성자    : san
 5. 작성일    : 2024. 07. 20

 param : str : video_path, int : max_frames
 return : frame
"""
def read_video(video_path, max_frames=18000):
    cap = cv2.VideoCapture(video_path)

    frames = []
    count = 0

    while cap.isOpened():
        if count > max_frames:
            break
        ret, frame = cap.read()

        if ret == True:
            frame = cv2.resize(frame, (640, 480))
            frames.append(frame)
            count += 1
        else:
            break

    frames = np.stack(frames)
    return frames

"""
 1. MethodName: get_features
 2. ClassName : abnomal.py
 3. Comment   : 모델 입력을 위한 영상 특징 추출
 4. 작성자    : san
 5. 작성일    : 2024. 07. 20

 param : str : video_path, model : clip_model, model : processor int : segments
 return : torch : avg_embeddings
"""
def get_features(video_path, clip_model, processor, segments=32):
    frames = read_video(video_path)
    
    n_splits = int(np.ceil(len(frames) / 3600))
    
    frame_splits = np.array_split(frames, n_splits)
    embeddings = []
    
    for split in frame_splits:
        inputs = processor(images=split, return_tensors="pt")

        with torch.no_grad():
            inputs["pixel_values"] = inputs["pixel_values"].to(device)
            outputs = clip_model(**inputs)

        embeddings.append(outputs.pooler_output.cpu())
    
    embeddings = torch.cat(embeddings, dim=0)
    
    if segments == -1:
        return embeddings
    
    num_frames = len(frames)
    interval = num_frames // segments
    
    if num_frames % segments > 0:
        start = random.sample(range(num_frames % segments), 1)[0]
    else:
        start = 0
    end = start + interval * segments
    
    avg_embeddings = []
    
    for idx in range(start, end, interval):
        avg = embeddings[idx: idx + interval].mean(axis=0)
        avg_embeddings.append(avg)
    
    return torch.stack(avg_embeddings)

"""
 1. MethodName: load_model
 2. ClassName : abnomal.py
 3. Comment   : 모델 로드
 4. 작성자    : san
 5. 작성일    : 2024. 07. 20

 param : str : model_path
 return : model : model
"""
def load_model(model_path):
    model = Learner(input_dim=768, drop_p=0.0).to(device)
    model.load_state_dict(torch.load(model_path))
    model.eval()
    return model


# 저장된 모델 불러오기
model_load_path = "/home/crowdm_python/flask_project/model/clip_model.pth"
loaded_model = Learner(input_dim=768, drop_p=0.0).to(device)
loaded_model.load_state_dict(torch.load(model_load_path))
loaded_model.eval()

"""
 1. MethodName: predict
 2. ClassName : abnomal.py
 3. Comment   : 이상행동 여부 판단
 4. 작성자    : san
 5. 작성일    : 2024. 07. 20

 param : str : video_path, model : clip_model, model : processor, int : segment
 return : numpy : predictions
"""
def predict(video_path, clip_model, processor, segments):
    features = get_features(video_path, clip_model, processor, segments=segments).to(device)
    with torch.no_grad():
        outputs = loaded_model(features)
        predictions = outputs.cpu().numpy()
    return predictions

"""
 1. MethodName: anomal_detection
 2. ClassName : abnomal.py
 3. Comment   : 이상행동 여부 판단
 4. 작성자    : san
 5. 작성일    : 2024. 07. 20

 param : str : video_path, model : clip_model, model : processor, int : segment_duration
 return : list : results
"""
def anomal_detection(video_path, clip_model, processor, segment_duration=5):
    # video_path의 영상 분석
    capture = cv2.VideoCapture(video_path)
    # 전체 frame 수 계산
    fps = capture.get(cv2.CAP_PROP_FPS)
    total_frames = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
    capture.release()

    # segment_duration 간격의 frame만 분석
    segment_frames = int(segment_duration * fps)
    total_segments = (total_frames + segment_frames - 1) // segment_frames
    
    results = []
    for segment_index in range(total_segments):
        start_frame = segment_index * segment_frames
        end_frame = min((segment_index + 1) * segment_frames, total_frames)
        # 영상 분석
        predictions = predict(video_path, clip_model, processor, segments=total_segments)
        # segment 구간의 점수 평균 계산
        mean_prediction = predictions.mean()
        logger.info(f'mean_prediction : {mean_prediction}')
        
        # 임계치를 기준으로 normal / anomal 판단
        result = 'normal' if mean_prediction > 0.38 else 'anomal'
        # 상황 발생한 timestamp 계산
        start_timestamp = start_frame / fps
        results.append((start_timestamp, result))
    
    return results

