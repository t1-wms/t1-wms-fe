pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'frontend:latest'
        DOCKER_TAG = "frontend:${BUILD_NUMBER}"
        EC2_DOMAIN = 'stockholmes.store'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                    sh 'rm -rf node_modules package-lock.json'
                    sh 'npm install'
                }
            }
        }

        stage('Build React Project') {
            steps {
                dir("./packages") {
                    nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -f ./Dockerfile -t ${DOCKER_IMAGE} ."
                    sh "docker tag ${DOCKER_IMAGE} ${DOCKER_TAG}"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    def sshServerName = 'FrontendServer'
                    sshPublisher(publishers: [
                        sshPublisherDesc(
                            configName: sshServerName,
                            transfers: [
                                sshTransfer(
                                    sourceFiles: "./packages/frontend/dist/**/*",  // dist 폴더를 전송
                                    remoteDirectory: "/home/ec2-user/frontend",  // EC2 서버의 폴더
                                    removePrefix: "dist",  // dist 폴더만 전송
                                    execCommand: """
                                        echo 'Deploying to EC2...'

                                        # 기존 컨테이너 중지 및 삭제
                                        docker stop frontend_container || true
                                        docker rm frontend_container || true

                                        # 새 Docker 컨테이너 실행
                                        docker run -d -v /home/ec2-user/frontend:/usr/share/nginx/html -p 8081:80 --name frontend_container ${DOCKER_TAG}

                                        # Nginx 재시작
                                        docker exec frontend_container nginx -s reload

                                        echo 'Deployment completed!'
                                    """
                                )
                            ]
                        )
                    ])
                }
            }
        }
    }
}
