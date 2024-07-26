# -*- coding: utf-8 -*-
import requests
import os
from dotenv import load_dotenv
import logging
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


#  * 1. ModuleName: guide  
#  * 2. FileName : rag.py
#  * 3. Comment  : rag
#  * 4. 작성자   : boyeong, bonjae
#  * 5. 작성일   : 2024. 07. 25.



load_dotenv()

warnings.filterwarnings("ignore", category=DeprecationWarning)

# Supabase 클라이언트 생성
supabase: Client = create_client(supabase_url, supabase_key)

client = OpenAI(api_key=api_key)

def put_db(aa, video_index, situ):
    
    start_index = aa.find("[답변]:")
    query = aa[:start_index]

    response_text = aa[start_index + len("[답변]:"):].strip()

    current_datetime = datetime.now()
    if situ in ['폭행', '실신']:
        ab_yn=True
        ab_type = situ
        congetion = 'null'
    else:
        ab_yn=False
        ab_type ='null'
        congetion=situ


    response=supabase.table("video_analysis").insert({
        "start_time":current_datetime.strftime('%Y-%m-%d %H:%M:%S'),
        "c_level":congetion,
        "ab_yn":ab_yn,
        "ab_type":ab_type,
        "video_index":video_index

        }).execute()
    
    temp_video_analysis = supabase.table("video_analysis").select("analysis_index").order("analysis_index", desc=True).limit(1).execute()
    analysis_index=temp_video_analysis.data[0]['analysis_index']

    response = supabase.table("message_log").insert({
        "date": current_datetime.strftime('%Y-%m-%d %H:%M:%S'),
        "context": str(response_text),
        "context_title": str(situ),
        "analysis_index": analysis_index # Directly use the list
    }).execute()
    
    response = supabase.table("prompt_log").insert({
        "input": str(query),
        "output": str(response_text),
    }).execute()
    
    res = supabase.table("message_log").select("log_index").order("log_index", desc=True).limit(1).execute()
    
    res_log=res.data[0]['log_index']
    
    response = supabase.table("message_management").insert({
        "user_index": 11,
        "video_index": video_index,
        "confirm": False,
        "log_index": res_log
    }).execute()
    
 
def get_embedding(text, model="text-embedding-3-small"):
   text = text = str(text).replace("\n", " ")
   return client.embeddings.create(input = [text], model=model).data[0].embedding


def getmessage_abno(situ, time, h_yn, location, video_index):
# 쿼리 텍스트 임베딩 생성 및 유사도 검색 수행
    query = f'{time} {h_yn} {location}에서 {situ}등급 인파밀집이 발생했어 대응 방법이 있나요?'
    query_embedding = get_embedding(query, model="text-embedding-3-small")

# Supabase에서 임베딩 데이터 검색
    response = supabase.table("embeddings_0714").select("*").execute()
    embeddings_data = response.data

# 임베딩 데이터와 쿼리 임베딩 비교
    results = []
    for item in embeddings_data:

        distance=cosine_similarity(np.array(item['embedding']).reshape(1,-1), np.array(query_embedding).reshape(1,-1))[0,0]
        results.append({"text": item["text"], "distance": distance})



        prompt = """                                                                                                                                                                                                                                                            너는 군중 관리 전문가이며, 주어진 상황에 대한 인파 관리 방안을 제시해야 합니다. 아래 정보와 문서를 참고하여 질문에 답변해 주세요. 모르는 내용이 있다면 모른다고 솔직하게 답해 주세요. 답변은 한국어로 작성해 주세요.

                입력에는 다음의 정보가 포함됩니다:
                - 인파혼잡도 등급 (여유, 보통, 혼잡, 매우혼잡)
                - 시간 (년월일)
                - 휴일 여부
                - 발생 장소

                각 입력에 대해 구체적인 대응 방안을 제공해 주세요. 상황에 맞는 구체적이고 실질적인 대응 방법을 제시하는 것이 중요합니다.

                답변 형식:
                1. 상황 설명
                2. 시간대를 참고하여 러시아워 여부와 날짜를 참고하여 공휴일, 주말, 평일의 특성 그리고 장소의 특성 기술
                3. 대응 방안
                
                예시:
                [질문]: 2022년 12월 25일, 휴일, 상왕십리에서 혼잡등급 인파 밀집이 발생했습니다. 대응 방법 및 피해가 커지지 않도록 하는 방법을 알려 주세요.

                [답변]:
                1. 상황 설명
                2022년 12월 25일, 평일인 상왕십리에서 혼잡등급의 인파 밀집이 발생했습니다.

                2. 시간과 장소의 특성 기술
                - 상왕십리는 도심 지역에 위치하며 대중교통이 발달한 곳으로, 사람들의 이동이 많은 특성을 가지고 있습니다. 혼잡등급의 인파 밀집이 발생할 경우 군중 사고의 위험이 증가할 수 있습니다.

                3. 대응 방안
                - 대응 1: 추가 경찰 및 보안 요원을 배치하여 군중 통제를 강화하고 안전을 유지합니다.
                - 대응 2: 출입구 및 주요 통로 주변에 안내원을 배치하여 방향 지시 및 안전을 도우며, 혼잡 지역의 통행을 원활하게 합니다.
                - 대응 3: 혼잡 지역 주변에 응급 대피 및 구조팀을 배치하여 긴급 상황에 신속히 대처할 수 있도록 합니다.
                - 대응 4: 대중교통을 이용하는 이동 수단을 활성화하기 위해 정확한 현황 정보를 제공하고, 효율적인 이동 경로를 안내합니다.

                이상의 대응 방안을 통해 혼잡 상황에서의 안전과 통제를 강화하여 피해를 최소화할 수 있습니다.

                질문: {query}
                문서 1: {text1}
                문서 2: {text2}
                문서 3: {text3}
                문서 4: {text4}
                문서 5: {text5}

    """


    results = sorted(results, key=lambda x: x['distance'])
    passages = [item['text'] for item in results[:5]]
    prompt = prompt.format(time, location, situ, text1=passages[0],text2=passages[1],text3=passages[2],text4=passages[3], text5=passages[4], query=query)

    response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
    {"role": "system", "content": """또한, 다중/밀집 인파에 대해서 전문가입니다. crowd managment, 인파관리에 대한 전문가입니다. 주어진 문서를 바탕으로 질문에 답해주세요.답변은 한국어로 작성해주세요.
답변은 아래의 예시 형식으로 해주세요.  특히 반드시 location의 건물, 장소 특성을 고려해주세요.
"""},
    {"role": "user", "content": prompt}
  ]
)
    aa=response.choices[0].message.content
    
    put_db(aa, video_index, situ )
    return aa
    #return 'abno 완료'

def getmessage_abyes(situ, time, h_yn, location, video_index):
# 쿼리 텍스트 임베딩 생성 및 유사도 검색 수행
    query = f'[이상행동]{time} {location} {situ} 발생했습니다. 대응 방법이 있나요?'
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
            
            당신은 폭행, 싸움, 절도, 기물파손, 실신, 배회, 침입, 투기, 강도, 데이트 폭력, 납치, 주취해동과 같은 이상행동에 대한 전문가입니다. 주어진 문서를 바탕으로 질문에 답해주세요. 답변은 한국어로 작성해주세요.

답변은 아래의 예시 형식으로 해주세요. 질문에서 time, location, situ를 추출하여 응답에 활용하세요. 특히 반드시 location의 건물, 장소 특성과 time의 특성을 고려해주세요.

예시:
[질문]: time, location에 폭행 상황이 발생했습니다. 이에 대한 대처법과 행동요령에 대해 알려주세요.
[답변]: time에 location 지역에서 이상행동, 폭행이 발생했습니다. 상황에 대한 대응은 다음과 같습니다.
- 대응 1: location 특성상 출구가 많습니다. 각 출구에 안전요원을 배치해야 합니다.
- 대응 2: location 특성상 사람이 많습니다. 폭행 가해자와 다른 사람들을 격리시키십시오. 방송을 활용하는 것도 좋습니다.
- 대응 3: (추가적인 대응 방안)

질문: {query}
문서 1: {text1}
문서 2: {text2}
문서 3: {text3}
문서 4: {text4}
문서 5: {text5}

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
    
    put_db(aa, video_index, situ)
    return aa

def guide(situ, time, h_yn, location) :
     
    temp_video_index = supabase.table("video").select("video_index").order("video_index", desc=True).limit(1).execute()
    video_index = temp_video_index.data[0]['video_index'] if temp_video_index.data else None

    if '혼잡' in situ:
        print('===============================================================================')
        print('abyes 발동')
        print('video_index :', video_index)
        result=getmessage_abno(situ, time, h_yn, location, video_index)
        
    else:
        print('===============================================================================')
        print('abyes 발동')
        print('video_index :', video_index)
        result=getmessage_abyes(situ, time, h_yn, location, video_index)
        
    return result
