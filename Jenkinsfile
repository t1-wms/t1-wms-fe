pipeline {
   agent any

   environment {
       EC2_DOMAIN = 'stockholmes.store'
       EC2_USER = 'ec2-user'
       VITE_SERVER_URL = credentials('VITE_SERVER_URL')
   }

   stages {
       stage('Checkout') {
           steps {
               checkout scm
               sh '''
                   echo "===== Workspace contents ====="
                   ls -la
                   echo "===== Project root contents ====="
                   pwd
               '''
           }
       }

       stage('Install dependencies') {
           steps {
               nodejs(nodeJSInstallationName: 'NodeJS 20.11.1') {
                   sh '''
                       echo "===== Before cleanup ====="
                       ls -la

                       # Clean previous installations
                       rm -rf node_modules
                       rm -rf packages/*/node_modules
                       rm -rf packages/*/package-lock.json

                       # Install project dependencies
                       npm install
                       npm install -D @rollup/rollup-linux-x64-gnu @types/react @types/react-dom @tailwindcss/vite

                       echo "===== After dependencies installation ====="
                       ls -la
                       echo "===== Packages directory ====="
                       ls -la packages/
                       echo "===== WMS package contents ====="
                       ls -la packages/wms/
                   '''
               }
           }
       }

       stage('Copy Shared Folder') {
           steps {
               script {
                   sh '''
                       echo "===== Before copy shared folder ====="
                       ls -la packages/wms/

                       mkdir -p packages/wms/dist
                       cp -r packages/shared/* packages/wms/dist/

                       echo "===== After copy shared folder ====="
                       ls -la packages/wms/dist/
                   '''
               }
           }
       }

       stage('Build WMS') {
           steps {
               nodejs(nodeJSInstallationName: 'NodeJS 20.11.1') {
                   sh '''
                       echo "===== Before build ====="
                       ls -la packages/wms/

                         echo "VITE_SERVER_URL=${VITE_SERVER_URL}" > packages/wms/.env
                       echo "===== Created .env file ====="
                       cat packages/wms/.env
                       
             npm run build:wms

                       echo "===== After build ====="
                       echo "WMS dist directory contents:"
                       ls -la packages/wms/dist/
                       echo "Assets directory contents:"
                       ls -la packages/wms/dist/assets/
                   '''
               }
           }
       }

       stage('Deploy to EC2') {
           steps {
               script {
                   sshPublisher(
                       publishers: [
                           sshPublisherDesc(
                               configName: 'FrontendServer',
                               transfers: [
                                   sshTransfer(
                                       sourceFiles: "nginx/frontend.conf,nginx/nginx.conf,packages/wms/dist/**",
                                       remoteDirectory: "",
                                       execCommand: '''

                                           echo "===== Cleaning up old directories ====="
                                           rm -rf ~/frontend/wms/dist/*
                                           rm -rf ~/frontend/dist

                                           echo "===== Creating new directory structure ====="
                                           mkdir -p ~/frontend/nginx
                                           mkdir -p ~/frontend/wms/dist

                                           echo "===== Moving files ====="
                                           mv packages/wms/dist/* ~/frontend/wms/dist/
                                           mv nginx/* ~/frontend/nginx/

                                           echo "===== New directory contents ====="
                                           ls -la ~/frontend/wms/dist/

                                           echo "===== Updating Nginx configuration ====="
                                           sudo cp ~/frontend/nginx/frontend.conf /etc/nginx/conf.d/
                                           sudo nginx -t && sudo systemctl reload nginx

                                           echo "===== Final directory structure ====="
                                           ls -la ~/frontend/
                                           ls -la ~/frontend/wms/dist/

                                           echo "Deployment completed successfully"
                                       '''
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
           echo "===== Workspace contents after build ====="
           sh 'ls -la'
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