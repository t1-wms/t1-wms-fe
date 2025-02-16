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

# 필수 패키지 설치
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

# Nginx 관련 디렉토리 권한 수정
RUN mkdir -p /var/run/nginx && chown -R nginx:nginx /var/run/nginx
RUN chmod -R 755 /var/cache/nginx
RUN chmod -R 755 /usr/share/nginx
RUN chmod -R 755 /usr/share/nginx/html

# 빌드된 파일들을 Nginx html 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 설정 변경 (사용자 변경 방지)
RUN sed -i 's/^user nginx;/#user nginx;/' /etc/nginx/nginx.conf

# Nginx 실행 사용자로 변경 (nginx는 root로 실행되지 않도록 하기 위해)
USER nginx

# 포트 노출
EXPOSE 8081

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
