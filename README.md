
# MilGam: AI Crowd Management

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [프로젝트 개요](#프로젝트-개요)
3. [주요 기능](#주요-기능)
4. [기술 스택](#기술-스택)
5. [아키텍처 및 모델 정의서](#아키텍처-및-모델-정의서)
6. [팀원별 역할](#팀원별-역할)

## 프로젝트 소개
### AI를 활용한 인파밀집 및 이상행동 검출 서비스

2022년 이태원 참사 이후 인파 관리에 대한 정부, 민간의 관심이 집중되고 있다. <br>
인파 관리 문제를 해결하기 위한 다양한 솔루션이 나왔지만 우리는 여전히 인파 관리의 위험에 노출되어 있다. <br>
또한, 칼부림, 묻지마 범죄, 흉기 난동과 같은 사건이 많이 발생하면서 시민들은 언제 자신이 피해자가 될지 모르는 불안감을 가지고 살고 있다. <br>
"밀감"은 이러한 현 상황을 반영해 인파 밀집과 이상행동을 탐지해 시민들의 안전한 생활에 기여하고자 한다.


## 프로젝트 개요

* **소속**: KT AivleSchool 5기 AI 트랙
* **기간**: 24.06.17 - 24.07.26 <br>

![1p정의서](https://github.com/user-attachments/assets/d79526d3-cf5e-4a43-a142-0fbdef4162c2)

## 주요 기능

### 1. AI 분석을 위한 영상 업로드
<p align="center">
  <img src="https://github.com/user-attachments/assets/59d017c0-aca8-4c4f-aa03-94f88a74e086" alt="영상업로드" width="80%"/>
</p>
<br/>

- **밀집도 계산**: 사람 수를 계산하고 이를 기반으로 밀집도 분류 (여유, 보통, 혼잡, 매우 혼잡)

<p align="center">
 <img src="https://github.com/user-attachments/assets/9c062f8c-4ef9-413b-a58f-28c285ca05a6" alt="밀집도" width="50%"/>
</p>


- **이상행동 점수 계산**: 이상행동 점수를 계산하고 임계치를 기준으로 normal / anomal로 구분

<p align="center">
 <img src="https://github.com/user-attachments/assets/027b7a18-dcc1-4fe7-86f3-7750d0cd8dcd" alt="이상행동 점수" width="50%"/>
</p>


- **이상행동 구분**: anomal인 경우 mmaction을 사용해 어떤 이상행동인지 구분
  
<p align="center">
 <img src="https://github.com/user-attachments/assets/9843d446-85fd-4e5a-abe0-db2951188e2e" alt="이상행동 구분 1" width="50%"/> <img src="https://github.com/user-attachments/assets/0ba9d588-d3b0-49c8-9aa2-2e94b00c3e0a" alt="이상행동 구분 2" width="50%"/>
</p>


- **안전 가이드라인 생성**: 인파밀집(혼잡, 매우 혼잡) 또는 이상행동 발생 시 안전 가이드라인 생성

<p align="center">
 <img src="https://github.com/user-attachments/assets/3cf7e3e5-7266-467f-ab7d-30ee102e9352" alt="안전 가이드라인" width="50%"/>
</p>

<br>

### 2. AI 분석 결과 알림 확인
<p align="center">
  <img src="https://github.com/user-attachments/assets/5a358013-ed0b-4901-8422-ce75c5b3ec0d" alt="알림서비스" width="80%"/>
</p>
<br>

### 3. 관리자 모드
<p align="center">
  <img src="https://github.com/user-attachments/assets/60a9c6ec-2ca4-40fd-a075-39e3342af417" alt="관리자모드" width="80%"/>
</p>

### 발표 영상
<p align="center">
  <a href="https://youtu.be/FxWXDx1QPDk">
    <img src="http://img.youtube.com/vi/FxWXDx1QPDk/0.jpg" alt="Video Label" width="60%"/>
  </a>
</p>
<br>

## 기술 스택

#### FRONT-END

<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/></a>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"/></a>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/></a>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white"/></a>
<img src="https://img.shields.io/badge/MUI-007FFF?style=flat&logo=mui&logoColor=white"/>

#### BACK-END

<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=flat&logo=Spring Boot&logoColor=white"/> <a>
<img src="https://img.shields.io/badge/Java-007396?style=flat&logo=Java&logoColor=white"/> <a>
<img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=Python&logoColor=white"/> <a>
<img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white"/> <a> 
<img src="https://img.shields.io/badge/postman-FF6C37?style=flat&logo=postman&logoColor=white"/> <a>

#### AI
<img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=Python&logoColor=white"/> </a>
<img src="https://img.shields.io/badge/Pandas-150458?style=flat&logo=Pandas&logoColor=white"/> </a>
<img src="https://img.shields.io/badge/Numpy-013243?style=flat&logo=Numpy&logoColor=white"/> </a>
<img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=flat&logo=OpenCV&logoColor=white"/> </a>
<img src="https://img.shields.io/badge/keenetic-009EE2?style=flat&logo=keenetic&logoColor=white"/> 
</a>
<img src="https://img.shields.io/badge/pytorch-EE4C2C?style=flat&logo=pytorch&logoColor=white"/> </a>
<img src="https://img.shields.io/badge/huggingface-FFD21E?style=flat&logo=huggingface&logoColor=black"/> </a>
<img src="https://img.shields.io/badge/scikitlearn-F7931E?style=flat&logo=scikitlearn&logoColor=white"/> </a>

#### DB
<img src="https://img.shields.io/badge/postgresql-4169E1?style=flat&logo=postgresql&logoColor=white"/></a>
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=flat&logo=supabase&logoColor=white"/></a>
<img src="https://img.shields.io/badge/sqlite-003B57?style=flat&logo=sqlite&logoColor=white"/></a>

#### CI/CD

<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/></a>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Jenkins-D24939?style=flat&logo=Jenkins&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=Amazon EC2&logoColor=white"/></a>
<img src="https://img.shields.io/badge/GCP-4285F4?style=flat&logo=googlecloud&logoColor=white"/></a>
<img src="https://img.shields.io/badge/Filezilla-BF0000?style=flat&logo=filezilla&logoColor=white"/></a> 

<br>

## 아키텍처 및 모델 정의서
- **Architecture**

  <p align="center">
    <img src="https://github.com/user-attachments/assets/aeb1bb27-b83e-46b0-acad-1c70e444980a" alt="아키텍처 1" width="80%"/>
  </p>

- **CV**

  <p align="center">
    <img src="https://github.com/user-attachments/assets/22d30544-4f5c-4e00-b6da-29b250f5527d" alt="아키텍처 2" width="80%"/>
  </p>

- **RAG**

  <p align="center">
    <img src="https://github.com/user-attachments/assets/46a176ac-377f-446d-ad2d-18cd3e30027e" alt="아키텍처 3" width="80%"/>
  </p>
  
<br>

## 팀원별 역할
- [K-Saaan](https://github.com/K-Saaan)
  #### BE
  > Spring Boot 프로젝트 환경 구축 및 관리 <br>
  > Spring Security 개발	<br>
  > 공통 함수 개발	<br>
  > 영상 업로드 API 개발 <br>
  > WebSocket 통신 개발 <br>
  > Flask 개발 환경 구축 <br>
  > 모델 분석 자동화 파이프라인 구축 <br>
  
  #### AI
  > Human count 모델 개발	<br>
  > 이상행동 여부 판단 모델 개발	 <br>
  > LLM Prompt Engineering에 참여해 모델 성능 향상	<br>

- [indoorkeyman](https://github.com/indoorkeyman)
  #### FE
  > React.js 프로젝트 환경 구축 및 관리 <br>
  > 프로젝트 전반적인 d-buging <br>
  > NavBar weather 기능 <br>
  > Home 화면 구축 <br>
  
  #### BE
  > Spring Boot Event Page API 구축 <br>
  > Flask 개발 환경 구축 <br> 
  
  #### AI
  > RAG vector 데이터 생성 및 관리 <br>
  > RAG BaseLine 개발 <br>
  > LLM Prompt Engineering에 참여해 모델 성능 향상	<br>
  > GCP 환경 구축 <br>
  
  #### DB
  > ERD 설계 <br>
  > Supabase로 프로젝트 DB 구축 <br>
  > Supabase 유지보수 및 관리 <br>

- [m1-j1n](https://github.com/m1-j1n)
  #### FE
  > 대시보드 페이지 개발 <br>
  > &emsp;◦ 네이버 지도 API, 서울시 실시간 인구 API 활용  <br>
  > &emsp;◦ Chart.js, ApexCharts를 활용한 데이터 시각화 <br>
  > 어드민 페이지, 문의 게시판, FAQ 페이지 개발 <br>
  > 다크 모드 테마 설정

- [Lumi-p](https://github.com/Lumi-p)
  #### FE
  > 로그인/아웃 페이지 개발 및 로그인 상태 관리  <br>
  > 영상 업로드, 분석 결과 페이지 개발  <br>
  > 어드민 회원가입 승인 API 연동  <br>
  > 라이트 모드 테마 설정, 테마 변경 개발  <br>

- [bboyeong](https://github.com/bboyeong)
  #### BE/DB/AI
- [w0n-100](https://github.com/w0n-100)
  #### FE/AI

- [dbqudals](https://github.com/dbqudals)
  #### BE
  > 회원 가입 API 개발 <br>

  #### CICD(Jenkins - EC2)
  > WEB Server 자동화 파이프라인 환경 구축 및 관리 <br>

- [ideal402](https://github.com/ideal402)
  #### AI
  > 이상행동 여부 판단 모델 시현 및 사용성 판단 <br>
  > 이상행동 분류 모델 시현 및 파인 튜닝 <br>
  > 관절인식모델 시현 및 사용성 평가 <br>
  > 데이터셋 수집 및 학습 데이터셋 구성 <br>

  #### BE
  > 메세지 알림 API 개발	<br>
  > 메세지 DB관리 API 개발	 <br>
  > SSE 통신 구현	<br>

  #### FE
  > 메세지 관련 api 호출 코드 작성	<br>
  > api로 받아온 데이터 후처리 코드 작성	 <br>

- [leesumin](https://github.com/leesumin)
  #### BE
