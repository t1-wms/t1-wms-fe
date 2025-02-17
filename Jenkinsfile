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
                        rm -rf node_modules packages/*/node_modules packages/*/package-lock.json

                        # Install dependencies (only required ones)
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
                        cp -r packages/shared/* packages/wms/dist/
                    '''
                }
            }
        }

        stage('Build WMS') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 20.11.1') {
                    sh '''
                        # Build only WMS
                        npm run build:wms
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -f Dockerfile -t ${DOCKER_TAG_WMS} ."
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
                                        sourceFiles: "docker-compose.yml, Dockerfile, nginx/frontend.conf, nginx/nginx.conf, packages/shared/*",
                                        remoteDirectory: "",
                                        execCommand: '''
                                            # 초기 디렉토리 설정
                                            cd ~
                                            mkdir -p frontend/nginx frontend/shared

                                            # 파일 이동
                                            mv docker-compose.yml frontend/
                                            mv Dockerfile frontend/
                                            mv nginx/* frontend/nginx/
                                            mv packages/shared/* frontend/shared/

                                            # Nginx 설정 반영
                                            sudo cp frontend/nginx/frontend.conf /etc/nginx/conf.d/
                                            sudo nginx -t && sudo systemctl reload nginx

                                            # 기존 컨테이너 중지 및 제거
                                            cd frontend
                                            docker container stop wms || true
                                            docker container rm wms || true

                                            # 새 컨테이너 실행
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
