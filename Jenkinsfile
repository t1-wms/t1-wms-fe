pipeline {
    agent any

    stages {
        stage('Cleanup') {
            steps {
                sh "rm -f ./packages/wms/wms_front_0.1.0.tar ./packages/worker/worker_front_0.1.0.tar"
                echo 'Cleanup success!'
            }
        }

        stage('Install dependencies') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                    sh 'rm -rf node_modules package-lock.json'
                    sh 'npm install'
                    sh 'npm install typescript@~5.6.2 --save-dev'
                    sh 'npm install react@^18.3.1 react-dom@^18.3.1 @types/react-dom@^18.3.5 --save'
                }
                echo 'Dependencies installed successfully!'
            }
        }

        stage('Build') {
            parallel {
                stage('Build wms') {
                    steps {
                        dir("./packages/wms") {
                            nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                                sh 'npm run build'
                            }
                        }
                        echo "wms Build success!"
                    }
                }

                stage('Build worker') {
                    steps {
                        dir("./packages/worker") {
                            nodejs(nodeJSInstallationName: 'NodeJS 21.1.0') {
                                sh 'npm run build'
                            }
                        }
                        echo "worker Build success!"
                    }
                }
            }
        }

        stage('Docker Build and Push') {
            steps {
                dir("./") {
                    sh 'docker build -t myrepo/frontend:latest .'
                    sh 'docker push myrepo/frontend:latest'
                }
                echo "Docker image pushed successfully!"
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def sshServerName = 'FrontendServer'
                    sshPublisher(publishers: [
                        sshPublisherDesc(
                            configName: sshServerName,
                            transfers: [
                                sshTransfer(
                                    sourceFiles: "./Dockerfile",
                                    remoteDirectory: "/home/ec2-user/frontend",
                                    execCommand: """
                                        docker pull myrepo/frontend:latest &&
                                        docker stop frontend_container || true &&
                                        docker rm frontend_container || true &&
                                        docker run -d -p 80:80 --name frontend_container myrepo/frontend:latest
                                    """
                                )
                            ]
                        )
                    ])
                }
                echo 'Deploy success!'
            }
        }
    }
}
