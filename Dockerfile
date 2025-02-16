# Node.js 21을 기반으로 React 빌드 실행
FROM node:21 AS build

# React 프로젝트 복사 및 빌드
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Nginx 이미지 사용
FROM nginx:alpine

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

# 사용자 추가 및 권한 설정
RUN groupadd -g 998 docker && \
    useradd -u 1000 -g docker -m jenkins && \
    usermod -aG docker jenkins

# Nginx 캐시 디렉토리 생성 및 권한 부여
RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R jenkins:docker /var/cache/nginx

# Nginx 실행 사용자 변경 방지 (Nginx는 root로 실행)
RUN sed -i 's/^user nginx;/#user nginx;/' /etc/nginx/nginx.conf

# 빌드된 파일들을 Nginx html 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8081

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
