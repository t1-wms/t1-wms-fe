pipeline {
   agent any

   environment {
       DOCKER_TAG_WMS = "wms:${BUILD_NUMBER}"
       DOCKER_TAG_WORKER = "worker:${BUILD_NUMBER}"
       EC2_DOMAIN = 'stockholmes.store'
       EC2_USER = 'ec2-user'
       WMS_DIST_PATH = '/home/ec2-user/frontend/wms/dist'
       WORKER_DIST_PATH = '/home/ec2-user/frontend/worker/dist'
       SHARED_CSS_PATH = '/home/ec2-user/frontend/shared/style'
   }

   stages {
       stage('Checkout') {
           steps {
               checkout scm
           }
       }

       stage('Install dependencies') {
           steps {
               nodejs(nodeJSInstallationName: 'NodeJS 20.11.1') {
                   sh '''
                       # Clean previous node_modules and package-lock.json
                       rm -rf node_modules
                       rm -rf packages/wms/node_modules
                       rm -rf packages/worker/node_modules

                       # Reset npm cache
                       npm cache clean --force

                       # Install project dependencies using workspace
                       npm install
                   '''
               }
           }
       }

       stage('Copy Shared Folder') {
           steps {
               script {
                   sh '''
                       mkdir -p packages/wms/dist
                       mkdir -p packages/worker/dist
                       cp -r packages/shared/* packages/wms/dist/
                       cp -r packages/shared/* packages/worker/dist/
                   '''
               }
           }
       }

       stage('Build Projects') {
           steps {
               nodejs(nodeJSInstallationName: 'NodeJS 20.11.1') {
                   sh 'npm run build'
               }
           }
       }

       stage('Build Docker Images for WMS and Worker with Docker Compose') {
           steps {
               script {
                   sh "docker-compose -f docker-compose.yml build --no-cache"
               }
           }
       }

       stage('Deploy to EC2') {
           steps {
               script {
                   def sshServerName = 'FrontendServer'
                   sshPublisher(
                       publishers: [
                           sshPublisherDesc(
                               configName: sshServerName,
                               transfers: [
                                   sshTransfer(
                                       sourceFiles: "docker-compose.yml,packages/wms/Dockerfile,packages/worker/Dockerfile,nginx/frontend.conf,nginx/nginx.conf",
                                       remoteDirectory: "/home/ec2-user/frontend/",
                                       execCommand: """
                                           # 필요한 디렉토리 생성
                                           mkdir -p /home/ec2-user/frontend/nginx
                                           mkdir -p /home/ec2-user/frontend/packages/wms
                                           mkdir -p /home/ec2-user/frontend/packages/worker

                                           # 파일 복사
                                           cp docker-compose.yml /home/ec2-user/frontend/
                                           cp -r packages/wms/Dockerfile /home/ec2-user/frontend/packages/wms/
                                           cp -r packages/worker/Dockerfile /home/ec2-user/frontend/packages/worker/
                                           cp nginx/* /home/ec2-user/frontend/nginx/

                                           # Nginx 설정
                                           sudo cp /home/ec2-user/frontend/nginx/frontend.conf /etc/nginx/conf.d/
                                           sudo nginx -t && sudo systemctl reload nginx

                                           # Docker 컨테이너 재시작
                                           cd /home/ec2-user/frontend
                                           docker-compose down
                                           docker-compose up -d
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

   post {
       always {
           cleanWs()
       }
       failure {
           echo 'Pipeline failed!'
       }
       success {
           echo 'Pipeline succeeded!'
       }
   }
}