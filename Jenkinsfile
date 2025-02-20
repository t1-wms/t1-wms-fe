pipeline {
    agent any

    environment {
        EC2_WMS_DOMAIN = 'stockholmes.store'
        EC2_WORKER_DOMAIN = 'worker.stockholmes.store'
        EC2_USER = 'ec2-user'
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

                        # lightningcss Linux 바이너리 설치
                        npm install -D lightningcss-linux-x64-gnu

                        echo "===== After dependencies installation ====="
                        ls -la
                        echo "===== Packages directory ====="
                        ls -la packages/
                        echo "===== WMS package contents ====="
                        ls -la packages/wms/
                        echo "===== Worker package contents ====="
                        ls -la packages/worker/
                    '''
                }
            }
        }

        stage('Copy Shared Folder') {
            steps {
                script {
                    sh '''
                        # For WMS
                        echo "===== Before copy shared folder to WMS ====="
                        ls -la packages/wms/
                        mkdir -p packages/wms/dist
                        cp -r packages/shared/* packages/wms/dist/
                        echo "===== After copy shared folder to WMS ====="
                        ls -la packages/wms/dist/

                        # For Worker
                        echo "===== Before copy shared folder to Worker ====="
                        ls -la packages/worker/
                        mkdir -p packages/worker/dist
                        cp -r packages/shared/* packages/worker/dist/
                        echo "===== After copy shared folder to Worker ====="
                        ls -la packages/worker/dist/
                    '''
                }
            }
        }

        stage('Build WMS') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 20.11.1') {
                    sh '''
                        echo "===== Before WMS build ====="
                        ls -la packages/wms/

                        npm run build:wms

                        echo "===== After WMS build ====="
                        echo "WMS dist directory contents:"
                        ls -la packages/wms/dist/
                        echo "Assets directory contents:"
                        ls -la packages/wms/dist/assets/
                    '''
                }
            }
        }

        stage('Build Worker') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 20.11.1') {
                    sh '''
                        echo "===== Before Worker build ====="
                        ls -la packages/worker/

                        npm run build:worker

                        echo "===== After Worker build ====="
                        echo "Worker dist directory contents:"
                        ls -la packages/worker/dist/
                        echo "Assets directory contents:"
                        ls -la packages/worker/dist/assets/
                    '''
                }
            }
        }

         stage('Deploy WMS to EC2') {
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
                                             echo "===== Cleaning up old WMS directories ====="
                                             rm -rf ~/frontend/wms/dist/*
                                             rm -rf ~/frontend/dist

                                             echo "===== Creating new WMS directory structure ====="
                                             mkdir -p ~/frontend/nginx
                                             mkdir -p ~/frontend/wms/dist

                                             echo "===== Moving WMS files ====="
                                             mv packages/wms/dist/* ~/frontend/wms/dist/
                                             mv nginx/frontend.conf ~/frontend/nginx/frontend.conf

                                             echo "===== New WMS directory contents ====="
                                             ls -la ~/frontend/wms/dist/

                                             echo "===== Updating Nginx configuration ====="
                                             sudo cp ~/frontend/nginx/frontend.conf /etc/nginx/conf.d/
                                             sudo nginx -t && sudo systemctl reload nginx

                                             echo "===== Final WMS directory structure ====="
                                             ls -la ~/frontend/
                                             ls -la ~/frontend/wms/dist/

                                             echo "WMS Deployment completed successfully"
                                         '''
                                     )
                                 ]
                             )
                         ]
                     )
                 }
             }
         }

         stage('Deploy Worker to EC2') {
             steps {
                 script {
                     sshPublisher(
                         publishers: [
                             sshPublisherDesc(
                                 configName: 'WorkerServer',
                                 transfers: [
                                     sshTransfer(
                                         sourceFiles: "nginx/frontend2.conf,nginx/nginx.conf,packages/worker/dist/**",
                                         remoteDirectory: "",
                                         execCommand: '''
                                             echo "===== Cleaning up old Worker directories ====="
                                             rm -rf ~/frontend/worker/dist/*
                                             rm -rf ~/frontend/dist

                                             echo "===== Creating new Worker directory structure ====="
                                             mkdir -p ~/frontend/nginx
                                             mkdir -p ~/frontend/worker/dist

                                             echo "===== Moving Worker files ====="
                                             mv packages/worker/dist/* ~/frontend/worker/dist/
                                             mv nginx/frontend2.conf ~/frontend/nginx/frontend2.conf

                                             echo "===== New Worker directory contents ====="
                                             ls -la ~/frontend/worker/dist/

                                             echo "===== Updating Nginx configuration ====="
                                             sudo cp ~/frontend/nginx/frontend2.conf /etc/nginx/conf.d/
                                             sudo nginx -t && sudo systemctl reload nginx

                                             echo "===== Final Worker directory structure ====="
                                             ls -la ~/frontend/
                                             ls -la ~/frontend/worker/dist/

                                             echo "Worker Deployment completed successfully"
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
        success {
            slackSend (
                message: """
                    :white_check_mark: 배포 성공 ! :white_check_mark:

                    *Job*: ${env.JOB_NAME} [${env.BUILD_NUMBER}]
                    *빌드 URL*: <${env.BUILD_URL}|링크>
                    *최근 커밋 메시지*: ${env.GIT_COMMIT_MESSAGE}
                """
            )
        }

        failure {
            slackSend (
                message: """
                    :x: 배포 실패 :x:

                    *Job*: ${env.JOB_NAME} [${env.BUILD_NUMBER}]
                    *빌드 URL*: <${env.BUILD_URL}|링크>
                    *최근 커밋 메시지*: ${env.GIT_COMMIT_MESSAGE}
                """
            )
        }
    }
}