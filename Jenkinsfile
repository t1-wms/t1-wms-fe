pipeline {
    agent any

    stages {
        stage('Cleanup') {
            steps {
                sh "rm -f ./packages/wms/front_0.1.0.tar ./packages/worker/front_0.1.0.tar ./packages/shared/front_0.1.0.tar"
                echo 'Cleanup success!'
            }
        }

        stage('Install dependencies') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS 21.7.1') {
                    sh 'npm install'
                    sh 'npm install typescript --save-dev'
                    sh 'npm install react react-dom @types/react-dom --save'
                }
                echo 'Dependencies installed successfully!'
            }
        }

        stage('Build') {
            parallel {
                stage('Build wms') {
                    steps {
                        dir("./packages/wms") {
                            nodejs(nodeJSInstallationName: 'NodeJS 21.7.1') {
                                sh 'npm run build'
                            }
                        }
                        echo "wms Build success!"
                    }
                }

                stage('Build worker') {
                    steps {
                        dir("./packages/worker") {
                            nodejs(nodeJSInstallationName: 'NodeJS 21.7.1') {
                                sh 'npm run build'
                            }
                        }
                        echo "worker Build success!"
                    }
                }

                stage('Build shared') {
                    steps {
                        dir("./packages/shared") {
                            nodejs(nodeJSInstallationName: 'NodeJS 21.7.1') {
                                sh 'npm run build'
                            }
                        }
                        echo "shared Build success!"
                    }
                }
            }
        }

        stage('Compression') {
            steps {
                dir("./packages/wms/dist") {
                    sh 'tar -czvf ../front_wms_0.1.0.tar .'
                }
                dir("./packages/worker/dist") {
                    sh 'tar -czvf ../front_worker_0.1.0.tar .'
                }
                dir("./packages/shared/dist") {
                    sh 'tar -czvf ../front_shared_0.1.0.tar .'
                }
                echo 'Compression success!'
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
                                    sourceFiles: "./packages/wms/front_wms_0.1.0.tar",
                                    remoteDirectory: "/home/ec2-user/frontend",
                                    execCommand: "sudo sh /home/ec2-user/frontend/wms/deploy_fe.sh"
                                ),
                                sshTransfer(
                                    sourceFiles: "./packages/worker/front_worker_0.1.0.tar",
                                    remoteDirectory: "/home/ec2-user/frontend",
                                    execCommand: "sudo sh /home/ec2-user/frontend/worker/deploy_fe.sh"
                                ),
                                sshTransfer(
                                    sourceFiles: "./packages/shared/front_shared_0.1.0.tar",
                                    remoteDirectory: "/home/ec2-user/frontend",
                                    execCommand: "sudo sh /home/ec2-user/frontend/shared/deploy_fe.sh"
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
