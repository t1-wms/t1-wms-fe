#!/bin/bash

# Docker 이미지를 최신으로 빌드
docker build -t frontend:latest .

# 기존 컨테이너가 있다면 중지하고 삭제
docker stop frontend_container || true
docker rm frontend_container || true

# 새로 Docker 컨테이너 실행
docker run -d -p 80:80 --name frontend_container frontend:latest

# 빌드 후 불필요한 이미지 제거
docker image prune -f

echo "Deployment complete!"
