#!/bin/bash

# EC2 서버에서 배포할 경로
WMS_DIST_PATH="/home/ec2-user/frontend/wms/dist"
SHARED_CSS_PATH="/home/ec2-user/frontend/shared/css"
NGINX_CONFIG_PATH="/home/ec2-user/frontend/config/nginx"

# 필요한 디렉토리 생성
ssh ec2-user@${EC2_DOMAIN} "mkdir -p ${WMS_DIST_PATH} ${SHARED_CSS_PATH} ${NGINX_CONFIG_PATH}"

# 빌드된 파일과 설정 파일을 EC2로 전송
scp -r packages/wms/dist/* ec2-user@${EC2_DOMAIN}:${WMS_DIST_PATH}
scp -r packages/shared/css/* ec2-user@${EC2_DOMAIN}:${SHARED_CSS_PATH}
scp -r config/nginx/* ec2-user@${EC2_DOMAIN}:${NGINX_CONFIG_PATH}

# Docker Compose 파일 전송
scp docker-compose.yml ec2-user@${EC2_DOMAIN}:/home/ec2-user/frontend/

# Nginx 설정 및 Docker 컨테이너 실행
ssh ec2-user@${EC2_DOMAIN} << 'EOF'
cd /home/ec2-user/frontend

# Nginx 설정 복사 및 리로드
sudo cp config/nginx/frontend.conf /etc/nginx/conf.d/
sudo nginx -t && sudo systemctl reload nginx

# Docker 컨테이너 재시작 (WMS만)
docker-compose down wms
docker-compose up -d wms

echo 'WMS Deployment completed!'
docker ps | grep wms
EOF