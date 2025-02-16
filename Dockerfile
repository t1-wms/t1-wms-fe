# Node.js 21을 기반으로 리액트 빌드를 먼저 실행
FROM node:21 AS build

# 리액트 프로젝트 복사
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Nginx 이미지 사용
FROM nginx:alpine

# Alpine 패키지 관리자를 이용해 필요한 패키지 설치
RUN apk update && apk add --no-cache \
    ca-certificates \
    curl \
    gnupg \
    sudo \
    bash \
    shadow \
    docker-cli \
 && rm -rf /var/cache/apk/*

# Docker 소켓 마운트 설정
VOLUME /var/run/docker.sock:/var/run/docker.sock

# 빌드된 리액트 파일을 nginx의 html 디렉토리로 복사
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8081

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
