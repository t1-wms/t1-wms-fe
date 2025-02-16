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

VOLUME /usr/share/nginx/html
# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
