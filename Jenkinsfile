pipeline {
   agent any

   environment {
       DOCKER_TAG_WMS = "wms:${BUILD_NUMBER}"
       EC2_USER = 'ec2-user'
   }

   stages {
       // ... 이전 스테이지들 유지 ...

       stage('Deploy to EC2') {
           steps {
               script {
                   sshPublisher(
                       publishers: [
                           sshPublisherDesc(
                               configName: 'FrontendServer',
                               transfers: [
                                   sshTransfer(
                                       sourceFiles: "docker-compose.yml,packages/wms/Dockerfile,nginx/frontend.conf,nginx/nginx.conf",
                                       remoteDirectory: "frontend",
                                       execCommand: """
                                           cd ~/frontend

                                           # 필요한 디렉토리 생성
                                           mkdir -p nginx
                                           mkdir -p packages/wms

                                           # 파일 복사
                                           cp docker-compose.yml ./
                                           cp -r packages/wms/Dockerfile packages/wms/
                                           cp nginx/* nginx/

                                           # Nginx 설정
                                           sudo cp nginx/frontend.conf /etc/nginx/conf.d/
                                           sudo nginx -t && sudo systemctl reload nginx

                                           # Docker 컨테이너 재시작
                                           docker-compose down
                                           docker-compose up -d wms
                                           docker ps
                                       """
                                   )
                               ]
                           )
                       ]
                   )
               }
           }
       }
   }

   // ... post 섹션 유지 ...
}