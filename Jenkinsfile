pipeline {
   agent any

   environment {
       DOCKER_TAG_WMS = "wms:${BUILD_NUMBER}"
       EC2_DOMAIN = 'stockholmes.store'
       EC2_USER = 'ec2-user'
       WMS_DIST_PATH = '/home/ec2-user/frontend/wms/dist'
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
                        # Clean previous installations
                        rm -rf node_modules
                        rm -rf packages/*/node_modules
                        rm -rf packages/*/package-lock.json

                        # Install project dependencies
                        npm install
                        npm install -D @rollup/rollup-linux-x64-gnu @types/react @types/react-dom @tailwindcss/vite
                    '''
               }
           }
       }

       stage('Copy Shared Folder') {
           steps {
               script {
                   sh '''
                       mkdir -p packages/wms/dist
                       cp -r packages/shared/* packages/wms/dist/
                   '''
               }
           }
       }

       stage('Build WMS') {
           steps {
               nodejs(nodeJSInstallationName: 'NodeJS 20.11.1') {
                sh '''
                    # Run WMS build only
                    npm run build:wms
                '''
               }
           }
       }

       stage('Build Docker Image for WMS') {
           steps {
               script {
                   sh "docker build -f packages/wms/Dockerfile -t ${DOCKER_TAG_WMS} ."
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
                                       sourceFiles: "docker-compose.yml,packages/wms/Dockerfile,nginx/frontend.conf,nginx/nginx.conf",
                                       remoteDirectory: "/home/ec2-user/frontend/",
                                       execCommand: """
                                           # 필요한 디렉토리 생성
                                           mkdir -p /home/ec2-user/frontend/nginx
                                           mkdir -p /home/ec2-user/frontend/packages/wms

                                           # 파일 복사
                                           cp docker-compose.yml /home/ec2-user/frontend/
                                           cp -r packages/wms/Dockerfile /home/ec2-user/frontend/packages/wms/
                                           cp nginx/* /home/ec2-user/frontend/nginx/

                                           # Nginx 설정
                                           sudo cp /home/ec2-user/frontend/nginx/frontend.conf /etc/nginx/conf.d/
                                           sudo nginx -t && sudo systemctl reload nginx

                                           # Docker 컨테이너 재시작
                                           cd /home/ec2-user/frontend
                                           docker-compose down
                                           docker compose up -d wms
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