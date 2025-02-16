# 베이스 이미지 설정 (Nginx를 사용하여 React 앱을 제공)
FROM nginx:alpine

# 앱의 빌드된 파일을 Nginx의 HTML 디렉토리에 복사
COPY ./dist /usr/share/nginx/html

# Nginx 기본 설정 파일을 커스터마이즈하기 위해 덮어씌움
COPY ./nginx.conf /etc/nginx/nginx.conf

# 컨테이너 시작 시 Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
