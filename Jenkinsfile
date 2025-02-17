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

        stage('Build Projects') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 20.11.1') {
                    sh '''
                        # Run WMS build only
                        npm run build:wms
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh "docker build -f packages/wms/Dockerfile -t ${DOCKER_TAG_WMS} ."
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
                                        sourceFiles: "docker-compose.yml,nginx/frontend.conf,nginx/nginx.conf",
                                        remoteDirectory: "",
                                        execCommand: '''
                                            # 초기 디렉토리 설정
                                            cd ~
                                            mkdir -p frontend/nginx frontend/dist

                                            # 파일 이동
                                            mv docker-compose.yml frontend/
                                            mv nginx/* frontend/nginx/

                                            # Nginx 설정
                                            sudo cp frontend/nginx/frontend.conf /etc/nginx/conf.d/
                                            sudo nginx -t && sudo systemctl reload nginx

                                            # Docker 컨테이너 재시작
                                            cd frontend
                                            docker container stop wms || true
                                            docker container rm wms || true
                                            docker-compose up -d wms

                                            # 상태 확인
                                            docker ps
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