#!/bin/bash

# dist 디렉토리의 경로를 정의
DIST_DIR="/home/ec2-user/frontend/dist"

# 압축 해제할 임시 디렉토리 생성
TEMP_DIR="/home/ec2-user/frontend/temp"
sudo mkdir -p "$TEMP_DIR"

# 압축 해제
tar -xvf /home/ec2-user/frontend/front_0.1.0.tar -C "$TEMP_DIR"

# 기존 dist 디렉토리가 있다면 삭제
if [ -d "$DIST_DIR" ]; then
    sudo rm -rf "$DIST_DIR"
fi

# dist 디렉토리를 생성
sudo mkdir -p "$DIST_DIR"

# 임시 디렉토리의 내용을 dist로 이동
sudo mv "$TEMP_DIR"/* "$DIST_DIR"

# 임시 디렉토리 삭제
sudo rm -rf "$TEMP_DIR"

# Nginx 설정 재적용
sudo nginx -s reload

echo "Deployment complete!"
