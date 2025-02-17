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

        stage('Install dependencies for WMS') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 22.0.0') {
                    sh 'rm -rf packages/wms/node_modules packages/wms/package-lock.json'
                    sh 'npm install --prefix packages/wms'
                }
            }
        }

        stage('Install dependencies for Worker') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 22.0.0') {
                    sh 'rm -rf packages/worker/node_modules packages/worker/package-lock.json'
                    sh 'npm install --prefix packages/worker'
                }
            }
        }

        stage('Copy Shared Folder') {
            steps {
                script {
                    sh 'mkdir -p packages/wms/dist'
                    sh 'mkdir -p packages/worker/dist'
                    sh 'cp -r packages/shared/* packages/wms/dist/'
                    sh 'cp -r packages/shared/* packages/worker/dist/'
                }
            }
        }

        stage('Build WMS React Project') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 22.0.0') {
                    sh 'npm run build --prefix packages/wms'
                }
            }
        }

        stage('Build Worker React Project') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 22.0.0') {
                    sh 'npm run build --prefix packages/worker'
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
                                        sourceFiles: "docker-compose.yml,packages/wms/Dockerfile,packages/worker/Dockerfile,nginx/frontend.conf,nginx/nginx.conf",
                                        remoteDirectory: "",
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