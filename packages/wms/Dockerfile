# 빌드 스테이지
FROM node:20 AS build

# C++ 빌드 도구 설치 (node-gyp 및 네이티브 모듈 빌드용)
RUN apt-get update && apt-get install -y \
    g++ \
    build-essential

WORKDIR /app

# 최상위 package.json 파일 복사
COPY package*.json ./

# wms 하위의 package.json과 tsconfig 관련 파일 복사
COPY packages/wms/package*.json ./packages/wms/
COPY packages/wms/tsconfig*.json ./packages/wms/

# 기타 필요한 파일들 복사
COPY packages/wms/eslint.config.js ./packages/wms/
COPY packages/wms/Dockerfile ./packages/wms/
COPY packages/wms/index.html ./packages/wms/
COPY packages/wms/vite.config.ts ./packages/wms/
COPY packages/wms/src ./packages/wms/src
COPY packages/wms/public ./packages/wms/public

# 패키지 설치
RUN npm install --legacy-peer-deps
RUN npm install @rollup/rollup-linux-x64-gnu --save-dev
RUN npm install lightningcss-linux-x64-gnu --save-dev

# 소스 코드 복사 및 빌드
COPY packages/wms .
RUN npm run build:wms  # WMS 빌드 실행

# 프로덕션 스테이지
FROM nginx:alpine

# SSL 인증서 관련 패키지 설치
RUN apk update && apk add --no-cache ca-certificates curl

# nginx의 기본 콘텐츠 제거
RUN rm -rf /usr/share/nginx/html/*

# 빌드된 파일 복사
COPY --from=build /app/packages/wms/dist /usr/share/nginx/html

# nginx 설정
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]