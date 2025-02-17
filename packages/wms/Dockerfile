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

# WMS의 경우
COPY --from=build /app/packages/wms/dist /usr/share/nginx/html

# nginx 설정
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]