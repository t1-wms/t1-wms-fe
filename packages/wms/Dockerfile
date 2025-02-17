# 빌드 스테이지
FROM node:20 AS build
WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 소스 파일 복사
COPY . .

# 워크스페이스에서 WMS 프로젝트 빌드
RUN npm run build:wms

# 프로덕션 스테이지
FROM nginx:alpine
RUN apk update && apk add --no-cache ca-certificates curl
RUN rm -rf /usr/share/nginx/html/*

# 빌드된 파일 복사
COPY --from=build /app/packages/wms/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]