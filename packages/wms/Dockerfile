# 빌드 스테이지
FROM node:20 AS build

RUN apt-get update && apt-get install -y \
    g++ \
    build-essential

WORKDIR /app

# 루트 package.json만 복사 및 설치
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install @rollup/rollup-linux-x64-gnu --save-dev

# WMS 폴더만 복사
COPY packages/wms ./packages/wms

# WMS 빌드
RUN npm run build:wms

# 프로덕션 스테이지
FROM nginx:alpine

RUN apk update && apk add --no-cache ca-certificates curl
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/packages/wms/dist /home/ec2-user/frontend/wms/dist

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
