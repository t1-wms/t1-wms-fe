pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'frontend:latest'
        DOCKER_TAG = "frontend:${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Docker 이미지를 빌드하면서 의존성 설치와 빌드도 처리
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
                                    sourceFiles: "./packages/dist/**/*",
                                    remoteDirectory: "/home/ec2-user/frontend",
                                    removePrefix: "packages",
                                    execCommand: """
                                        echo 'Deploying to EC2...'

                                        # 기존 컨테이너가 있다면 중지하고 삭제
                                        docker stop frontend_container || true
                                        docker rm frontend_container || true

                                        # 새로 Docker 컨테이너 실행
                                        docker run -d -v /home/ec2-user/frontend:/usr/share/nginx/html -p 8081:80 --name frontend_container ${DOCKER_TAG}

                                        # Nginx 재시작 (필요시)
                                        docker exec frontend_container nginx -s reload

                                        echo 'Deployment completed!'
                                    """
                                )
                            ]
                        )
                    ]))
                }
            }
        }
    }
}
