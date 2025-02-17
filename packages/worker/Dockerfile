# 빌드 스테이지
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install @rollup/rollup-linux-x64-gnu --save-dev

COPY . .
RUN npm run build:worker

# 프로덕션 스테이지
FROM nginx:alpine
RUN apk update && apk add --no-cache ca-certificates curl
RUN rm -rf /usr/share/nginx/html/*

# 빌드된 파일 복사
COPY --from=build /app/packages/worker/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]