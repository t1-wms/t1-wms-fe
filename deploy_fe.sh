#!/bin/bash

# EC2 서버에서 배포할 경로
WMS_DIST_PATH="/home/ec2-user/frontend/wms/dist"
SHARED_CSS_PATH="/home/ec2-user/frontend/shared/css"
NGINX_CONFIG_PATH="/home/ec2-user/frontend/config/nginx"

# 필요한 디렉토리 생성
mkdir -p ${WMS_DIST_PATH} ${SHARED_CSS_PATH} ${NGINX_CONFIG_PATH}

# 빌드된 파일과 설정 파일을 적절한 위치로 이동
cp -r /home/ec2-user/frontend/packages/wms/dist/* ${WMS_DIST_PATH}
cp -r /home/ec2-user/frontend/packages/shared/css/* ${SHARED_CSS_PATH}
cp -r /home/ec2-user/frontend/nginx/* ${NGINX_CONFIG_PATH}

# Nginx 설정 복사 및 리로드
sudo cp ${NGINX_CONFIG_PATH}/frontend.conf /etc/nginx/conf.d/
sudo nginx -t && sudo systemctl reload nginx

echo 'WMS Deployment completed!'
ls -la ${WMS_DIST_PATH}