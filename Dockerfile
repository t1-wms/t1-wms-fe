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
    docker-cli

# Docker 소켓 마운트 설정
VOLUME /var/run/docker.sock:/var/run/docker.sock

# 사용자 추가 및 권한 설정
RUN groupadd -g 998 docker && \
    useradd -u 1000 -g docker -m jenkins && \
    usermod -aG docker jenkins

# Docker 명령어 실행을 위한 유저 설정
USER jenkins

# 필요한 디렉토리 생성
RUN mkdir -p /home/ec2-user/frontend/wms /home/ec2-user/frontend/worker

# 빌드된 wms, worker 디렉토리의 파일들을 Nginx에 복사
COPY ./packages/wms /home/ec2-user/frontend/wms
COPY ./packages/worker /home/ec2-user/frontend/worker

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
