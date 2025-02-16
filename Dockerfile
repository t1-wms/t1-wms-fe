# Node.js 21을 기반으로 React 빌드 실행
FROM node:21 AS build

# React 프로젝트 복사 및 빌드
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Nginx 이미지를 사용
FROM nginx:alpine

# 필수 패키지 설치 (최소화)
RUN apk update && apk add --no-cache \
    ca-certificates \
    curl \
 && rm -rf /var/cache/apk/*

# 빌드된 파일들을 Nginx HTML 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 설정 변경 (사용자 변경 방지)
RUN sed -i 's/^user nginx;/#user nginx;/' /etc/nginx/nginx.conf

# 포트 노출
EXPOSE 8081

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
