pipeline {
    agent any

    tools {
        nodejs "NodeJS" 
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/sihameniari/MSPR.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    def npmrcExists = fileExists('.npmrc')
                    if (npmrcExists) {
                        echo 'Using .npmrc for private registry authentication'
                    }
                }
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Package') {
            steps {
                sh 'npm run package'
            }
        }
        stage('Deploy') {
            steps {
                sshagent(['your-ssh-credential-id']) {
                    sh '''
                    scp -r dist/* user@server:/path/to/deploy
                    ssh user@server "cd /path/to/deploy && pm2 restart all"
                    '''
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
