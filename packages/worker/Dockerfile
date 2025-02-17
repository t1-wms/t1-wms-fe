# 빌드 스테이지
FROM node:20 AS build

# C++ 빌드 도구 설치 (node-gyp 및 네이티브 모듈 빌드용)
RUN apt-get update && apt-get install -y \
    g++ \
    build-essential

WORKDIR /app

# 패키지 설치
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install @rollup/rollup-linux-x64-gnu --save-dev
RUN npm install lightningcss-linux-x64-gnu --save-dev

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build:worker

# 프로덕션 스테이지
FROM nginx:alpine

# SSL 인증서 관련 패키지 설치
RUN apk update && apk add --no-cache ca-certificates curl

# nginx의 기본 콘텐츠 제거
RUN rm -rf /usr/share/nginx/html/*

# 빌드된 파일 복사
COPY --from=build /app/packages/worker/dist /usr/share/nginx/html

# nginx 설정
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]