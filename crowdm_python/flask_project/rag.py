from flask import Flask, request
import requests
import os
from dotenv import load_dotenv

from datetime import datetime
from openai import OpenAI
import os
import sqlite3
import json
import sqlite3
import warnings
from supabase import create_client, Client
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import sys


app = Flask(__name__)
load_dotenv()


#from openai.embeddings_utils import cosine_similarity
warnings.filterwarnings("ignore", category=DeprecationWarning)

api_key=os.getenv('OPENAI_API_KEY')

# Supabase URL과 API 키 설정
supabase_url = os.getenv('SUPABASE_SERVICE_KEY1')
supabase_key = os.getenv('SUPABASE_SERVICE_KEY')
# Supabase 클라이언트 생성
supabase: Client = create_client(supabase_url, supabase_key)

client = OpenAI(api_key=api_key)

def put_db(aa, congetion =None):
    
    start_index = aa.find("[답변]:")
    query = aa[:start_index]

    response_text = aa[start_index + len("[답변]:"):].strip()

    current_datetime = datetime.now()
    
    response = supabase.table("message_log").insert({
        "date": current_datetime.strftime('%Y-%m-%d %H:%M:%S'),
        "context": str(response_text),
        "context_title": str(congestion),
        "analysis_index": 1  # Directly use the list
    }).execute()
    
    response = supabase.table("prompt_log").insert({
        "input": str(query),
        "output": str(response_text),
    }).execute()
    
    print("[질문]", str(query))
    print("[답변]", str(response_text))
 
    

def get_embedding(text, model="text-embedding-3-small"):
   text = text = str(text).replace("\n", " ")
   return client.embeddings.create(input = [text], model=model).data[0].embedding


def getmessage_abno(congetstion, time, location):
# 쿼리 텍스트 임베딩 생성 및 유사도 검색 수행
    query = f'[밀집도]time {time} location {location}, 다중 인파 사고 대응 방법이 있나요?'
    query_embedding = get_embedding(query, model="text-embedding-3-small")

# Supabase에서 임베딩 데이터 검색
    response = supabase.table("embeddings_0714").select("*").execute()
    embeddings_data = response.data

# 임베딩 데이터와 쿼리 임베딩 비교
    results = []
    for item in embeddings_data:

        distance=cosine_similarity(np.array(item['embedding']).reshape(1,-1), np.array(query_embedding).reshape(1,-1))[0,0]
        results.append({"text": item["text"], "distance": distance})


    prompt = """

또한, 다중/밀집 인파에 대해서 전문가입니다. crowd managment, 인파관리에 대한 전문가입니다. 주어진 문서를 바탕으로 질문에 답해주세요.답변은 한국어로 작성해주세요.
답변은 아래의 예시 형식으로 해주세요. query에서 time, location을 추출하여 응답에 활용하세요. 특히 반드시 location의 건물, 장소 특성을 고려해주세요.

예시:
[질문]: 인파가 엄청 많아. 사고 대응법이 뭐야?
[답변]:
time에 location 지역에서 위험등급 인파 몰림이 발생했습니다. 상황에 대한 대응은 다음과 같습니다.

대응 1 : 00지역 특성상 출구가 많습니다. 각 출구에 안전요원을 배치해야합니다. 또한, 인파가 몰리는 곳에 바리게이트를 설치하는 등의 대응이 필요합니다.
대응 2 : 00지역 특성상 행사가 많습니다. 행사 전 안전 사전 교육 및 예행연습이 필요합니다.
대응 3


질문: {query}
문서1: {text1}
문서2: {text2}
문서3: {text3}
문서4: {text4}
문서5: {text5}
"""

    results = sorted(results, key=lambda x: x['distance'])
    passages = [item['text'] for item in results[:5]]
    prompt = prompt.format(text1=passages[0],text2=passages[1],text3=passages[2],text4=passages[3], text5=passages[4], query=query)

    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
    {"role": "system", "content": """또한, 다중/밀집 인파에 대해서 전문가입니다. crowd managment, 인파관리에 대한 전문가입니다. 주어진 문서를 바탕으로 질문에 답해주세요.답변은 한국어로 작성해주세요.
답변은 아래의 예시 형식으로 해주세요. query에서 time, location을 추출하여 응답에 활용하세요. 특히 반드시 location의 건물, 장소 특성을 고려해주세요.
"""},
    {"role": "user", "content": "인파 사고를 어떻게 예방해야해?"},
    {"role": "assistant", "content": "00시간 00구역에서 인파 위험이 감지되었습니다. 상황에 대한 대응은 다음과 같습니다. 00지역 특성상 출구가 많습니다. 각 출구에 안전요원을 배치해야합니다. 또한, 인파가 몰리는 곳에 바리게이트를 설치하는 등의 대응이 필요합니다. "},
    {"role": "user", "content": prompt}
  ]
)
    aa=response.choices[0].message.content
    
    put_db(aa, congetion= congestion)
    
    return 'abno 완료'

def getmessage_abyes(congetstion, time, location, ab_type):
# 쿼리 텍스트 임베딩 생성 및 유사도 검색 수행
    query = f'[이상행동]time {time} location {location} 이상행동 종류(ab_type) {ab_type},  대응 방법이 있나요?'
    query_embedding = get_embedding(query, model="text-embedding-3-small")

# Supabase에서 임베딩 데이터 검색
    response = supabase.table("embeddings_0714").select("*").execute()
    embeddings_data = response.data

# 임베딩 데이터와 쿼리 임베딩 비교
    results = []
    for item in embeddings_data:

        distance=cosine_similarity(np.array(item['embedding']).reshape(1,-1), np.array(query_embedding).reshape(1,-1))[0,0]
        results.append({"text": item["text"], "distance": distance})


    prompt = """

            당신은 폭행 ,싸움 ,절도 ,기물파손, 실신, 배회 , 침입 ,투기 , 강도, 데이트 폭력, 납치, 주취해동 과 같은 이상행동에 대한 전문가입니다. 주어진 문서를 바탕으로 질문에 답해주세요.답변은 한국어로 작성해주세요.
            답변은 아래의 예시 형식으로 해주세요. query에서 time, location, ab_type을 추출하여 응답에 활용하세요. 특히 반드시 location의 건물, 장소 특성을 고려해주세요.

            예시:
            [질문]: 폭행을 하는 사람이 있어. 대처법이 뭐야?
            [답변]:
            time에 location 지역에서 이상행동, 폭행이 발생했습니다.. 상황에 대한 대응은 다음과 같습니다.

            대응 1 : 00지역 특성상 출구가 많습니다. 각 출구에 안전요원을 배치해야합니다. 
            대응 2 : 00지역 특성상 사람이 많습니다. 폭행꾼과 다른 사람들을 격리시키십시오. 방송을 활용하는 것도 좋습니다.
            대응 3


            질문: {query}
            문서1: {text1}
            문서2: {text2}
            문서3: {text3}
            문서4: {text4}
            문서5: {text5}
            """

    results = sorted(results, key=lambda x: x['distance'])
    passages = [item['text'] for item in results[:5]]
    prompt = prompt.format(text1=passages[0],text2=passages[1],text3=passages[2],text4=passages[3], text5=passages[4], query=query)

    response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
            {"role": "system", "content": """당신은 폭행 ,싸움 ,절도 ,기물파손, 실신, 배회 , 침입 ,투기 , 강도, 데이트 폭력, 납치, 주취해동 과 같은 이상행동에 대한 전문가입니다. 주어진 문서를 바탕으로 질문에 답해주세요.답변은 한국어로 작성해주세요.
        답변은 아래의 예시 형식으로 해주세요. query에서 time, location, ab_type을 추출하여 응답에 활용하세요. 특히 반드시 location의 건물, 장소 특성을 고려해주세요.
        """},
            {"role": "user", "content": "이상행동을 보이는 사람을 어떻게 대처해야해?"},
            {"role": "assistant", "content": "00시간 00구역에서 이상행동이 감지되었습니다. 상황에 대한 대응은 다음과 같습니다. 00지역 특성상 출구가 많습니다. 각 출구에 안전요원을 배치해야합니다. 또한, 다른 사람과 이상행동꾼을 격리시키십시오. "},
            {"role": "user", "content": prompt}
        ]
        )
    
    aa=response.choices[0].message.content
    
    put_db(aa, congetion=congestion)
    
    return 'abyes 완료'


if __name__ == '__main__': # python testrag.py 혼잡 7월17일 혜화역 절도
    
    congestion = sys.argv[1]
    time = sys.argv[2]
    location = sys.argv[3]
    
        
    if len(sys.argv) == 5:
        
            ab_type = sys.argv[4]
        
            print('===============================================================================')
            if congestion in ['혼잡', '매우혼잡'] :
                print('getmessage_abyes 실행')
                print(getmessage_abyes(congestion, time, location, ab_type))
                print()
                print('혼잡 혹은 매우혼잡으로 getmessage_abno 실행')
                print(getmessage_abno(congestion, time, location))
                print()
            else :
                print('getmessage_abyes 실행')
                print('혼잡도가 보통 혹은 여유 입니다. abno 생략')
                print(getmessage_abyes(congestion, time, location, ab_type))
                print()
        
        
        
    elif len(sys.argv) == 4:
        
            if congestion in ['혼잡', '매우혼잡'] :
                print('===============================================================================')
                print('혼잡 혹은 매우혼잡으로 getmessage_abno 실행')
                print(getmessage_abno(congestion, time, location))
                print()
            else :
                print('혼잡도가 보통 혹은 여유 입니다.')
        
    else:
            print('===============================================================================')
            print('파라미터 갯수 불일치로 프로그램 종료')
            print()
            sys.exit(1)  # 프로그램 종료
        
        
        
    
    
    # app.run(host='0.0.0.0', port=5000)
    app.run(debug=False)

