# Nginx 이미지 사용
FROM nginx:alpine

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

VOLUME /var/run/docker.sock:/var/run/docker.sock

# 사용자 추가 및 권한 설정
RUN groupadd -g 998 docker && \
    useradd -u 1000 -g docker -m jenkins && \
    usermod -aG docker jenkins

# Docker 명령어 실행을 위한 유저 설정
USER jenkins

RUN mkdir -p /home/ec2-user/frontend/wms /home/ec2-user/frontend/worker

# 빌드된 wms, worker 디렉토리의 dist 폴더를 Nginx에 복사
COPY ./frontend/packages/wms/dist /home/ec2-user/frontend/wms
COPY ./frontend/packages/worker/dist /home/ec2-user/frontend/worker

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
