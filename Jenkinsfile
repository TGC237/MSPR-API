pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        CI = 'true'
        SONAR_TOKEN = 'd17e8c02af31cf7a0623b9c006adc02d534ea838'
        DOCKERHUB_CREDENTIALS = credentials('5cd92e2b-9f49-44a6-b2eb-b1148e40fb78')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                git branch: 'master', url: 'https://github.com/sihameniari/MSPR.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
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
                echo 'Building the project...'
                sh 'npm run build'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis...'
                withSonarQubeEnv('SonarCloud') {
                    sh """
                    sonar-scanner \
                        -Dsonar.projectKey=sihameniari_MSPR \
                        -Dsonar.organization=sihameniari-1 \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=https://sonarcloud.io \
                        -Dsonar.login=${env.SONAR_TOKEN}
                    """
                }
            }
        }
        stage('Quality Gate') {
            steps {
                echo 'Checking SonarQube quality gate...'
                waitForQualityGate abortPipeline: true
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    docker.build('sihameniari/apicommandes:latest')
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                echo 'Pushing Docker image...'
                script {
                    docker.withRegistry('https://index.docker.io/v1/', '5cd92e2b-9f49-44a6-b2eb-b1148e40fb78') {
                        docker.image('sihameniari/apicommandes:latest').push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
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
            echo 'Cleaning workspace...'
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
