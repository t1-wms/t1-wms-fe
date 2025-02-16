# Node.js 21을 기반으로 React 빌드 실행
FROM node:21 AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package.json package-lock.json ./
RUN npm install

# WMS 빌드
COPY packages/wms/ ./packages/wms/
WORKDIR /app/packages/wms
RUN npm run build:wms

# Worker 빌드
WORKDIR /app
COPY packages/worker/ ./packages/worker/
WORKDIR /app/packages/worker
RUN npm run build:worker

# 빌드된 파일들을 dist 디렉토리로 복사
RUN mkdir -p /app/dist && \
    cp -r /app/packages/wms/dist/* /app/dist/ && \
    cp -r /app/packages/worker/dist/* /app/dist/

# Nginx 이미지 사용
FROM nginx:alpine

# Nginx 설정 파일 복사 (사용자가 필요하면 설정할 수 있도록)
COPY nginx.conf /etc/nginx/nginx.conf

# 빌드된 dist 파일들을 Nginx HTML 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 권한 변경
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 8080

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
