pipeline {
    agent {
        docker {
            image 'node:20'
            args '-u root:root'
        }
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
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