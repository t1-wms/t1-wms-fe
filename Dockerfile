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

# Docker 명령어 실행을 위한 유저 설정
USER jenkins

# 빌드된 파일들을 Nginx html 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 권한 변경
RUN chmod -R 755 /usr/share/nginx/html

# 필요에 따라 다른 디렉토리 권한 설정
RUN chown -R nginx:nginx /usr/share/nginx/htm

EXPOSE 8081

# Nginx 실행 (root 사용자 유지)
CMD ["nginx", "-g", "daemon off;"]
