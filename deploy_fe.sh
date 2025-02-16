#!/bin/bash

# EC2 서버에서 배포할 경로
WMS_DIST_PATH="/home/ec2-user/frontend/wms/dist"
WORKER_DIST_PATH="/home/ec2-user/frontend/worker/dist"
SHARED_CSS_PATH="/home/ec2-user/frontend/shared/css"

# 빌드된 파일을 EC2로 전송
scp -r packages/wms/dist/* ec2-user@${EC2_DOMAIN}:${WMS_DIST_PATH}
scp -r packages/worker/dist/* ec2-user@${EC2_DOMAIN}:${WORKER_DIST_PATH}
scp -r packages/shared/css/* ec2-user@${EC2_DOMAIN}:${SHARED_CSS_PATH}

# Nginx 설정을 반영하여 Docker 컨테이너 실행
ssh ec2-user@${EC2_DOMAIN} <<EOF
    # WMS 배포
    echo 'Deploying WMS to EC2...'
    docker stop wms_container || true
    docker rm wms_container || true
    docker run -d -v ${WMS_DIST_PATH}:/usr/share/nginx/html -p 8081:80 --name wms_container wms:${BUILD_NUMBER}
    docker exec wms_container nginx -s reload

    # Worker 배포
    echo 'Deploying Worker to EC2...'
    docker stop worker_container || true
    docker rm worker_container || true
    docker run -d -v ${WORKER_DIST_PATH}:/usr/share/nginx/html -p 8082:80 --name worker_container worker:${BUILD_NUMBER}
    docker exec worker_container nginx -s reload

    echo 'Deployment completed!'
EOF
