# 빌드 스테이지
FROM node:21 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 프로덕션 스테이지
FROM nginx:alpine
RUN apk update && apk add --no-cache ca-certificates curl
RUN rm -rf /usr/share/nginx/html/*

# Nginx 설정 복사 (경로 수정)
COPY config/nginx/nginx.conf /etc/nginx/nginx.conf

# Worker의 경우
COPY --from=build /app/packages/worker/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]