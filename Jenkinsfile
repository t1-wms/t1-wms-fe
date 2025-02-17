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
                nodejs(nodeJSInstallationName: 'NodeJS 22.2.0') {
                    sh 'rm -rf packages/wms/node_modules packages/wms/package-lock.json'
                    sh 'npm install --prefix packages/wms'
                }
            }
        }

        stage('Install dependencies for Worker') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 22.2.0') {
                    sh 'rm -rf packages/worker/node_modules packages/worker/package-lock.json'
                    sh 'npm install --prefix packages/worker'
                }
            }
        }

        stage('Copy Shared Folder') {
            steps {
                script {
                    // shared 폴더 전체를 wms 및 worker 디렉토리의 dist로 복사
                    sh 'cp -r packages/shared/* packages/wms/dist/'
                    sh 'cp -r packages/shared/* packages/worker/dist/'
                }
            }
        }

        stage('Build WMS React Project') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 22.2.0') {
                    sh 'npm run build --prefix packages/wms'
                }
            }
        }

        stage('Build Worker React Project') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 22.2.0') {
                    sh 'npm run build --prefix packages/worker'
                }
            }
        }

        stage('Build Docker Images for WMS and Worker with Docker Compose') {
            steps {
                script {
                    // docker-compose로 빌드
                    sh "docker-compose -f docker-compose.yml build"
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
                                        docker-compose -f docker-compose.yml up -d wms
                                        echo 'WMS deployment completed!'
                                    """
                                ),
                                sshTransfer(
                                    sourceFiles: "./packages/worker/dist/**/*",
                                    remoteDirectory: "${WORKER_DIST_PATH}",
                                    removePrefix: "dist",
                                    execCommand: """
                                        echo 'Deploying Worker to EC2...'
                                        docker-compose -f docker-compose.yml up -d worker
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