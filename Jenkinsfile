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

       stage('Install Global Dependencies') {
           steps {
               nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                   sh '''
                       npm install -g typescript
                       npm install -g @types/node @types/react @types/react-dom
                   '''
               }
           }
       }

       stage('Install dependencies for Shared') {
           steps {
               nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                   sh '''
                       cd packages/shared
                       rm -rf node_modules package-lock.json
                       npm cache clean --force
                       npm install --legacy-peer-deps
                       npm install typescript@~5.6.2 @types/react@^18.3.18 @types/react-dom@^18.3.5
                       npm run build || true
                   '''
               }
           }
       }

       stage('Install dependencies for WMS') {
           steps {
               nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                   sh '''
                       cd packages/wms
                       rm -rf node_modules package-lock.json
                       npm cache clean --force
                       npm install --legacy-peer-deps
                       npm install @rollup/rollup-linux-x64-gnu
                       npm install typescript@~5.6.2 @types/react@^18.3.18 @types/react-dom@^18.3.5
                       npm install @types/react-router@^5.1.20 @types/react-router-dom@^5.3.3
                       npm install react-router@7.1.5 react-router-dom@7.1.5
                       npm install @t1-wms-fe/shared@file:../shared
                       npm install vite@^6.1.0
                   '''
               }
           }
       }

       stage('Install dependencies for Worker') {
           steps {
               nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                   sh '''
                       cd packages/worker
                       rm -rf node_modules package-lock.json
                       npm cache clean --force
                       npm install --legacy-peer-deps
                       npm install @rollup/rollup-linux-x64-gnu
                       npm install typescript@~5.6.2 @types/react@^18.3.18 @types/react-dom@^18.3.5
                       npm install @types/react-router@^5.1.20 @types/react-router-dom@^5.3.3
                       npm install react-router@7.1.5 react-router-dom@7.1.5
                       npm install @t1-wms-fe/shared@file:../shared
                       npm install vite@^6.1.0
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

                       # 필요한 파일만 선택적으로 복사
                       if [ -d "packages/shared/dist" ]; then
                           cp -r packages/shared/dist/* packages/wms/dist/
                           cp -r packages/shared/dist/* packages/worker/dist/
                       fi

                       # 필요한 경우 추가 파일 복사
                       cp -r packages/shared/package.json packages/wms/dist/
                       cp -r packages/shared/package.json packages/worker/dist/

                       # 스타일 파일 복사 (필요한 경우)
                       if [ -d "packages/shared/styles" ]; then
                           cp -r packages/shared/styles packages/wms/dist/
                           cp -r packages/shared/styles packages/worker/dist/
                       fi
                   '''
               }
           }
       }

       stage('Build WMS React Project') {
           steps {
               nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                   sh '''
                       cd packages/wms
                       npx tsc --noEmit
                       npm run build
                   '''
               }
           }
       }

       stage('Build Worker React Project') {
           steps {
               nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                   sh '''
                       cd packages/worker
                       npx tsc --noEmit
                       npm run build
                   '''
               }
           }
       }

       stage('Build Docker Images for WMS and Worker with Docker Compose') {
           steps {
               script {
                   sh "docker-compose -f docker-compose.yml build"
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
                                       sourceFiles: """
                                           docker-compose.yml,
                                           packages/wms/Dockerfile,
                                           packages/worker/Dockerfile,
                                           nginx/frontend.conf,
                                           nginx/nginx.conf
                                       """,
                                       removePrefix: "",
                                       remoteDirectory: ".",
                                       execCommand: """
                                           mkdir -p /home/ec2-user/frontend/nginx
                                           mkdir -p /home/ec2-user/frontend/packages/wms
                                           mkdir -p /home/ec2-user/frontend/packages/worker

                                           cp docker-compose.yml /home/ec2-user/frontend/
                                           cp -r nginx/frontend.conf nginx/nginx.conf /home/ec2-user/frontend/nginx/
                                           cp -r packages/wms/Dockerfile /home/ec2-user/frontend/packages/wms/
                                           cp -r packages/worker/Dockerfile /home/ec2-user/frontend/packages/worker/

                                           sudo cp /home/ec2-user/frontend/nginx/frontend.conf /etc/nginx/conf.d/
                                           sudo nginx -t && sudo systemctl reload nginx

                                           cd /home/ec2-user/frontend
                                           docker-compose down
                                           docker-compose up -d
                                           docker ps

                                           cd /home/ec2-user
                                           rm -f docker-compose.yml
                                           rm -rf nginx
                                           rm -rf packages
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
       success {
           echo 'Pipeline succeeded!'
       }
       failure {
           echo 'Pipeline failed!'
       }
   }
}