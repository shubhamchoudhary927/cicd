pipeline {
    agent any

    environment {
        APP_NAME = 'cicd-app'
        IMAGE_NAME = 'cicd-nextjs'
        CONTAINER_NAME = 'cicd-nextjs-container'
        APP_PORT = '3000'
        GIT_REPO = 'https://github.com/shubhamchoudhary927/cicd.git'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '--- Code checkout kar raha hoon ---'
                git branch: 'main',
                    url: "${GIT_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '--- npm install chal raha hai ---'
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                echo '--- Next.js build ho raha hai ---'
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                echo '--- Docker image ban rahi hai ---'
                sh '''
                    docker build -t ${IMAGE_NAME}:latest .
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo '--- Purana container band karke naya chala raha hoon ---'
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME}   || true

                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        --restart unless-stopped \
                        -p ${APP_PORT}:3000 \
                        ${IMAGE_NAME}:latest
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deploy successful! App chal rahi hai port ${APP_PORT} par"
        }
        failure {
            echo '❌ Pipeline fail ho gayi. Logs dekho.'
        }
        always {
            echo '--- Pipeline khatam ---'
        }
    }
}