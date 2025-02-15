# Node.js 기반의 이미지를 사용 (빌드 단계)
FROM node:16-alpine AS build

# 애플리케이션 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# Nginx 이미지를 사용 (실행 단계)
FROM nginx:alpine

# 빌드된 파일을 Nginx 서버로 제공
COPY --from=build /app/build /usr/share/nginx/html

# 80 포트로 서비스 제공
EXPOSE 80

# Nginx 서버 실행
CMD ["nginx", "-g", "daemon off;"]
