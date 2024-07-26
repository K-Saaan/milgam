import time
from mmaction.apis import inference_recognizer, init_recognizer
import numpy as np
import os
# import glob
'''
    * 1. MethodName: action_detecter
    * 2. ClassName : ActionDetecter
    * 3. Comment   : 동작분류하는 모델 호출 후 결과 반환
    * 4. 작성자    : been
    * 5. 작성일    : 2024. 07. 26
'''
def action_detecter(video):

    #라벨 정의
    labels = [
        "fight", "swoon"
    ]

    #경로설정
    config_path = '/home/crowdm_python/flask_project/mmaction2/configs/my_config.py'
    checkpoint_path = '/home/crowdm_python/flask_project/mmaction2/checkpoints/epoch_18.pth'

    # 모델 초기화
    model = init_recognizer(config_path, checkpoint_path, device="cpu")  # 'cuda:0'로 설정할 수 있습니다.
    start_time = time.time()

    # 비디오에서 예측 결과 얻기
    results = inference_recognizer(model, video)

    end_time = time.time()
    print("return: ",labels[results.pred_label.item()],", Elapsed time:", end_time - start_time)

    return labels[results.pred_label.item()]
