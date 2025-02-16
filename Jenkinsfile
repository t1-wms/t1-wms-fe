pipeline {
    agent any

    stages {
        stage('Cleanup') {
            steps {
                sh "rm -f ./packages/wms/front_0.1.0.tar ./packages/worker/front_0.1.0.tar"
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
            }
        }

        stage('Compression') {
            steps {
                dir("./packages/wms/dist") {
                    sh 'tar -czvf ../front_0.1.0.tar .'
                }
                dir("./packages/worker/dist") {
                    sh 'tar -czvf ../front_0.1.0.tar .'
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
                                    sourceFiles: "./packages/wms/front_0.1.0.tar",
                                    remoteDirectory: "/home/ec2-user/frontend",
                                    execCommand: "sudo sh /home/ec2-user/frontend/wms/deploy_fe.sh"
                                ),
                                sshTransfer(
                                    sourceFiles: "./packages/worker/front_0.1.0.tar",
                                    remoteDirectory: "/home/ec2-user/frontend",
                                    execCommand: "sudo sh /home/ec2-user/frontend/worker/deploy_fe.sh"
                                ),
                                // shared 폴더의 style.css 파일 반영만
                                sshTransfer(
                                    sourceFiles: "./packages/shared/style.css",
                                    remoteDirectory: "/home/ec2-user/frontend/static/css/",
                                    execCommand: "echo 'Shared assets updated successfully!'"
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
