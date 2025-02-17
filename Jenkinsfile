pipeline {
    agent any

    environment {
        EC2_DOMAIN = 'stockholmes.store'
        EC2_USER = 'ec2-user'
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
                        npm run build:wms
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
                                        sourceFiles: "nginx/frontend.conf,nginx/nginx.conf,packages/wms/dist/**/*",
                                        remoteDirectory: "",
                                        execCommand: '''
                                            # 초기 디렉토리 설정
                                            cd ~
                                            mkdir -p frontend/nginx
                                            mkdir -p frontend/dist

                                            # 파일 이동
                                            mv nginx/* frontend/nginx/
                                            mv packages/wms/dist/* frontend/dist/

                                            # Nginx 설정
                                            sudo cp frontend/nginx/frontend.conf /etc/nginx/conf.d/
                                            sudo nginx -t && sudo systemctl reload nginx

                                            # 상태 확인
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