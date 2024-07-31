
# MilGam: AI Crowd Management

## AI를 활용한 인파밀집 및 이상행동 검출 서비스

## 프로젝트 개요
2022년 이태원 참사 이후 정부•민간의 관심이 인파관리에 집중되었다. <br>
인파관리를 해결하기 위한 다양한 솔루션이 나왔지만 우리는 여전히 인파관리의 위험에 노출되어 있다. <br>
또한, 칼부림과 같은 묻지마 범죄, 흉기 난동과 같은 사건이 많이 발생하면서 시민들은 언제 자신이 피해자가 될지 모르는 불안 사회에 살고 있다. <br>
본 프로젝트 "밀감"은 이러한 현 상황을 반영해 인파밀집과 이상행동을 탐지해 시민들의 안전한 생활에 기여하고자 한다.

![image](https://github.com/user-attachments/assets/d79526d3-cf5e-4a43-a142-0fbdef4162c2)

## Preview

### AI 분석을 위한 영상 업로드
![영상업로드](https://github.com/user-attachments/assets/59d017c0-aca8-4c4f-aa03-94f88a74e086)
<br/>

- 사람 수를 계산하고 이를 기반으로 밀집도를 나눈다.(여유, 보통, 혼잡, 매우혼잡)
<img width="290" alt="스크린샷 2024-07-31 오후 12 06 53" src="https://github.com/user-attachments/assets/9c062f8c-4ef9-413b-a58f-28c285ca05a6">
<br/>

- 이상행동 점수를 계산하고 임계치를 기준으로 normal / anomal로 구분한다.
<img width="301" alt="스크린샷 2024-07-31 오후 12 07 46" src="https://github.com/user-attachments/assets/027b7a18-dcc1-4fe7-86f3-7750d0cd8dcd">
 
- anomal인 경우 mmaction을 사용해 어떤 이상행동인지 구분한다.
<img width="287" alt="스크린샷 2024-07-31 오후 12 16 16" src="https://github.com/user-attachments/assets/9843d446-85fd-4e5a-abe0-db2951188e2e">
<img width="350" alt="스크린샷 2024-07-31 오후 12 16 26" src="https://github.com/user-attachments/assets/0ba9d588-d3b0-49c8-9aa2-2e94b00c3e0a">

- 인파밀집(혼잡, 매우혼잡) 또는 이상행동 발생 시 안전 가이드라인을 생성한다.
<img width="480" alt="스크린샷 2024-07-31 오후 12 19 46" src="https://github.com/user-attachments/assets/3cf7e3e5-7266-467f-ab7d-30ee102e9352">



### AI 분석 결과 알림 확인
![알림서비스](https://github.com/user-attachments/assets/5a358013-ed0b-4901-8422-ce75c5b3ec0d)
<br/>

### 관리자 모드
![관리자모드](https://github.com/user-attachments/assets/60a9c6ec-2ca4-40fd-a075-39e3342af417)
<br/>
### 발표 영상
[![Video Label](http://img.youtube.com/vi/FxWXDx1QPDk/0.jpg)](https://youtu.be/FxWXDx1QPDk)

## Development_Skills

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
<img src="https://img.shields.io/badge/postman-FF6C37?style=flat&logo=postman&logoColor=whites"/> <a> 


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

## Architecture
![아키텍처 1](https://github.com/user-attachments/assets/aeb1bb27-b83e-46b0-acad-1c70e444980a)

## CV
![아키텍처 2](https://github.com/user-attachments/assets/22d30544-4f5c-4e00-b6da-29b250f5527d)

## RAG
![아키텍처 3](https://github.com/user-attachments/assets/46a176ac-377f-446d-ad2d-18cd3e30027e)

<br />

# 프로젝트 상세

## 주최
**KT**

## 소속
**AivleSchool 5기**

## 기간
**24.06.17~24.07.26**

## 팀원별 역할
- [K-Saaan](https://github.com/K-Saaan)
### BE
> Spring Boot 프로젝트 환경 구축 및 관리 <br>
> Spring Security 개발	<br>
> 공통 함수 개발	<br>
> 영상 업로드 API 개발 <br>
> WebSocket 통신 개발 <br>
> Flask 개발 환경 구축 <br>
> 모델 분석 자동화 파이프라인 구축 <br>

### AI

> Human count 모델 개발	<br>
> 이상행동 여부 판단 모델 개발	 <br>
> LLM Prompt Engineering에 참여해 모델 성능 향상	<br>

- [indoorkeyman](https://github.com/indoorkeyman)
  #### FE/BE/AI/DB
- [m1-j1n](https://github.com/m1-j1n)
  #### FE
- [Lumi-p](https://github.com/Lumi-p)
  #### FE
- [bboyeong](https://github.com/bboyeong)
  #### BE/DB/AI
- [w0n-100](https://github.com/w0n-100)
  #### FE/AI
- [dbqudals](https://github.com/dbqudals)
  #### BE/CICD/EC2/JENKINS
- [ideal402](https://github.com/ideal402)
  #### AI/BE/FE
- [leesumin](https://github.com/leesumin)
  #### BE
