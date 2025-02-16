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

# Docker 설치를 위한 패키지 추가
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    sudo \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | tee /etc/apt/trusted.gpg.d/docker.asc \
    && echo "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list \
    && apt-get update \
    && apt-get install -y docker-ce-cli docker-compose-plugin containerd.io \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Docker 소켓 마운트 설정 (DooD)
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
