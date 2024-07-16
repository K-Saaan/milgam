from flask import Flask, request
import requests
import os
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

@app.route('/upload', methods=['POST'])
def upload_chunk():
    file = request.files['file']
    file_name = request.files['fileName']
    chunk_index = request.form['chunkIndex']
    total_chunks = request.form['totalChunks']

    # 청크 분석 (예시로 그대로 둡니다)
    analysis_result = analyze_chunk(file)

    # EC2 서버로 결과 전송
    EC2_SERVER_URL = os.getenv('EC2_SERVER_URL')
    files = {'result': (f'result_{file_name}_{chunk_index}.txt', analysis_result)}
    data = {'chunkIndex': chunk_index, 'totalChunks': total_chunks}
    # response = requests.post(EC2_SERVER_URL, files=files, data=data)
    response = requests.post(EC2_SERVER_URL, data=data)

    return 'Chunk processed and result sent', 200

def analyze_chunk(chunk):
    # 분석 로직 (예시로 단순히 파일 이름 반환)
    return chunk.filename.encode('utf-8')

if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000)
    app.run(debug=True)