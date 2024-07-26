# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
import pandas as pd
import requests
import os
from dotenv import load_dotenv
import logging
import subprocess
from datetime import datetime
import numpy as np
import tempfile
from transformers import AutoProcessor, CLIPVisionModel

from rag import guide
from analyze_chunk import countPeople
from abnomal import anomal_detection
from mmaction2.actionDetecter import action_detecter

app = Flask(__name__)

# 현재 날짜와 시간 받아오기
now = datetime.now()

# 원하는 형식으로 포맷팅
formatted_date = now.strftime('%Y년%m월%d일')
yyyymm = now.strftime("%Y%m")
load_dotenv()

# 로그 설정
logger = logging.getLogger()

# 로그의 출력 기준 설정
logger.setLevel(logging.DEBUG)

# log 출력 형식
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)
log_now = now.strftime("%Y%m%d%H%M%S")
log_path = f'/home/crowdm_python/flask_project/log/{yyyymm}'

if not os.path.exists(log_path):
    os.makedirs(log_path)

file_handler = logging.FileHandler(f'{log_path}/{log_now}.log')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

# 이상행동 여부 판단에 필요한 모델 로드
processor = AutoProcessor.from_pretrained("openai/clip-vit-base-patch32")
clip_model = CLIPVisionModel.from_pretrained("openai/clip-vit-base-patch32")


def createGuide(situ, time, h_yn, place):
    logger.info('Start createGuide LLM >>>>>>>>>>>>>>>>>>>>. ')
    message = guide(situ, time, h_yn, place)
    logger.info('End createGuide LLM >>>>>>>>>>>>>>>>>>>>. ')
    return message

# 기본 접속 화면
@app.route('/')
def home():
    return "Flask API"

"""
 1. MethodName: upload_api
 2. ClassName : app.py
 3. Comment   : 요청 들어온 영상 처리 후 return
 4. 작성자    : san
 5. 작성일    : 2024. 07. 16

 param : files : file, str : fileName, str : place, str : time
 return : json : data
"""
@app.route('/upload', methods=['POST'])
def upload_api():

    # request 데이터 확인
    file = request.files['file']
    fileName = request.form.get('fileName')
    place = request.form.get('place')
    time = request.form.get('time')
    
    logger.info(f'file : {file}')
    logger.info(f'fileName : {fileName}')
    logger.info(f'place : {place}')
    logger.info(f'time : {time}')

    # 영상 파일 저장
    file_path = f'/home/crowdm_python/flask_project/data/video/{fileName}'
    file.save(file_path)

    # 가이드라인 생성을 위한 휴일 여부 확인
    holidays = pd.read_csv('/home/crowdm_python/flask_project/data/holidays.csv')
    holiday_day_list = holidays.loc[holidays['date']==0, 'date'].to_list()
    today = now.strftime('%Y-%m-%d')
    if today in holiday_day_list:
        h_yn = '휴일'
    else:
        h_yn = '평일'
    
    # 밀집도 파악
    logger.info(f'Start countPeople >>>>>>>>>>>>>>>>>')
    congestionResult = countPeople(file_path, place)
    logger.info("Congestion : ", congestionResult)
    logger.info(f'End countPeople >>>>>>>>>>>>>>>>>')
    
    result = []
    nowClevel = ''
    for eventTime, cLevel in congestionResult:
        logger.info("cLevel : ", cLevel)
        logger.info("nowClevel : ", nowClevel)
        if nowClevel == '' and cLevel in ['혼잡', '매우혼잡']:
            nowClevel = cLevel
            message = createGuide(cLevel, time, h_yn, place)
            result.append((eventTime, cLevel, message))
        elif nowClevel != cLevel and cLevel in ['혼잡', '매우혼잡']:
            message = createGuide(cLevel, time, h_yn, place)
            result.append((eventTime, cLevel, message))
    
    logger.info(f'Start abnomal detection >>>>>>>>>>>>>>>>>')
    abnomal = anomal_detection(file_path, clip_model, processor)
    logger.info(f'End abnomal detection >>>>>>>>>>>>>>>>>')

    nowAction = ''
    for timestamp, prediction in abnomal:
        logger.info(f'Timestamp: {timestamp:.2f}s, Prediction: {prediction}')
        if prediction == 'normal':
            continue
        else:
            action = action_detecter(file_path)
            if nowAction == '':
                nowAction = action
                actionMessage = createGuide(action, time, h_yn, place)
                logger.info(f'message : {actionMessage}')
                result.append((timestamp, action, actionMessage))
            elif nowAction != action:
                actionMessage = createGuide(action, time, h_yn, place)
                logger.info(f'message : {actionMessage}')
                logger.info("Action : ", action)
                result.append((timestamp, action, actionMessage))

    data = {'result' : result}
    # response 정의
    response = jsonify(data)
    logger.info(f'response : {response}')
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    # return
    return response

# flask 서버 실행
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)