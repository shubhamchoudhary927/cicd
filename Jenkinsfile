pipeline {
    agent any

    stages {
        stage('Install') {
            steps {
                sh 'docker run --rm -v $PWD:/app -w /app node:20 npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'docker run --rm -v $PWD:/app -w /app node:20 npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t cicd-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker rm -f cicd-app || true'
                sh 'docker run -d -p 3000:3000 --name cicd-app cicd-app'
            }
        }
    }
}