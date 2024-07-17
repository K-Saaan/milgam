# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
import requests
import os
# from dotenv import load_dotenv
import logging

app = Flask(__name__)
# load_dotenv()

# 로그 설정
logging.basicConfig(filename='app.log', level=logging.INFO)

@app.route('/')
def home():
    return "Flask API"


@app.route('/upload', methods=['POST'])
def upload_api():
    
    # EC2 서버로 결과 전송
    EC2_SERVER_URL = os.getenv('EC2_SERVER_URL')
    
    print(f'request : {request.data}')
    # file = request.files['file']
    file_name = request.form.get('fileName')
    chunk_index = request.form.get('chunkIndex')
    total_chunks = request.form.get('totalChunks')
    
    print(f'file_name : {file_name}')
    print(f'chunk_index : {chunk_index}')
    print(f'total_chunks : {total_chunks}')
    # # 청크 분석 (예시로 그대로 둡니다)
    # analysis_result = analyze_chunk(file)

    
    # files = {'result': (f'result_{file_name}_{chunk_index}.txt', analysis_result)}
    data = {'chunkIndex': chunk_index, 'totalChunks': total_chunks}
    # response = requests.post(EC2_SERVER_URL, data=data)

    return jsonify({
        'res' : 'success'
    })

# def analyze_chunk(chunk):
#     # 분석 로직 (예시로 단순히 파일 이름 반환)
#     return chunk.filename.encode('utf-8')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)