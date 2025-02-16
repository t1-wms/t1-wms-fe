pipeline {
    agent any

    environment {
        DOCKER_IMAGE_WMS = 'wms:latest'
        DOCKER_TAG_WMS = "wms:${BUILD_NUMBER}"
        DOCKER_IMAGE_WORKER = 'worker:latest'
        DOCKER_TAG_WORKER = "worker:${BUILD_NUMBER}"
        EC2_DOMAIN = 'stockholmes.store'
        EC2_USER = 'ec2-user'
        WMS_DIST_PATH = '/home/ec2-user/frontend/wms/dist'
        WORKER_DIST_PATH = '/home/ec2-user/frontend/worker/dist'
        SHARED_CSS_PATH = '/home/ec2-user/frontend/shared/css'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies for WMS') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                    sh 'rm -rf packages/wms/node_modules packages/wms/package-lock.json'
                    sh 'npm install --prefix packages/wms'
                }
            }
        }

        stage('Install dependencies for Worker') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                    sh 'rm -rf packages/worker/node_modules packages/worker/package-lock.json'
                    sh 'npm install --prefix packages/worker'
                }
            }
        }

        stage('Copy Shared CSS') {
            steps {
                script {
                    // shared/css를 wms 및 worker 디렉토리의 dist로 복사
                    sh 'cp -r packages/shared/css/* packages/wms/dist/'
                    sh 'cp -r packages/shared/css/* packages/worker/dist/'
                }
            }
        }

        stage('Build WMS React Project') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                    sh 'npm run build --prefix packages/wms'
                }
            }
        }

        stage('Build Worker React Project') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                    sh 'npm run build --prefix packages/worker'
                }
            }
        }

        stage('Build Docker Images for WMS and Worker') {
            steps {
                script {
                    sh "docker build -f ./packages/wms/Dockerfile -t ${DOCKER_IMAGE_WMS} ./"
                    sh "docker tag ${DOCKER_IMAGE_WMS} ${DOCKER_TAG_WMS}"

                    sh "docker build -f ./packages/worker/Dockerfile -t ${DOCKER_IMAGE_WORKER} ./"
                    sh "docker tag ${DOCKER_IMAGE_WORKER} ${DOCKER_TAG_WORKER}"
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
                                    sourceFiles: "./packages/wms/dist/**/*",  // wms dist 폴더 전송
                                    remoteDirectory: "${WMS_DIST_PATH}",  // EC2 서버의 wms 폴더
                                    removePrefix: "dist",
                                    execCommand: """
                                        echo 'Deploying WMS to EC2...'
                                        docker stop wms_container || true
                                        docker rm wms_container || true
                                        docker run -d -v ${WMS_DIST_PATH}:/usr/share/nginx/html -p 8081:80 --name wms_container ${DOCKER_TAG_WMS}
                                        docker exec wms_container nginx -s reload
                                        echo 'WMS deployment completed!'
                                    """
                                ),
                                sshTransfer(
                                    sourceFiles: "./packages/worker/dist/**/*",  // worker dist 폴더 전송
                                    remoteDirectory: "${WORKER_DIST_PATH}",  // EC2 서버의 worker 폴더
                                    removePrefix: "dist",
                                    execCommand: """
                                        echo 'Deploying Worker to EC2...'
                                        docker stop worker_container || true
                                        docker rm worker_container || true
                                        docker run -d -v ${WORKER_DIST_PATH}:/usr/share/nginx/html -p 8082:80 --name worker_container ${DOCKER_TAG_WORKER}
                                        docker exec worker_container nginx -s reload
                                        echo 'Worker deployment completed!'
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
