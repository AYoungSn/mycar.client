## 현대 오토에버 내 차 만들기 FE

### 서비스 소개
현대자동차 내차만들기 사이트에서 투싼, 더 뉴 아반떼 차량에 대해 분석하고 기존 사이트와 동일하게 동작하는 사이트를 만들어보는 과제입니다.

### 🛠️ 사용된 기술 스택

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=fff"></a>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-00A7E2?style=for-the-badge&logo=css3&logoColor=white">

<img src="https://img.shields.io/badge/React-2D333B?style=for-the-badge&logo=React&logoColor=61dafb"/></a>
<img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=&logoColor=white"/>
<img src = "https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
<img src = "https://img.shields.io/badge/Axios-181717?style=for-the-badge&logo=Axios&logoColor=white">

<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white"></a>
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=black">


### 🔑 실행 방법

1. git clone
2. npm install
3. .env 파일 생성 후 아래 내용 추가
```.env
REACT_APP_BASE_URL = http://localhost:8080
```
4. npm start
5. http://localhost:3000 으로 접속

#### 🐳 도커 실행 방법
1. docker build --tag react:test .
2. docker run -d -p 80:80 --name react-app react:test
3. docker 실행 후에는 http://localhost 로 접근
