pipeline {
    agent any

    environment {
        IMAGE_NAME = "cicd-app"
        CONTAINER_NAME = "cicd-app"
        PORT = "3000"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/shubhamchoudhary927/hy.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'docker run --rm -v $PWD:/app -w /app node:20 npm install'
            }
        }

        stage('Build App') {
            steps {
                sh 'docker run --rm -v $PWD:/app -w /app node:20 npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
                sh 'docker tag $IMAGE_NAME:$BUILD_NUMBER $IMAGE_NAME:latest'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                echo "Stopping old container..."
                docker rm -f $CONTAINER_NAME || true

                echo "Running new container..."
                docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME:$BUILD_NUMBER
                '''
            }
        }

        stage('Cleanup Old Images') {
            steps {
                sh '''
                echo "Cleaning unused images..."
                docker image prune -f
                '''
            }
        }
    }
}