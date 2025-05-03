pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "chatty-backend"
        FRONTEND_IMAGE = "chatty-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Building backend image..."
                    sh 'docker build -t $BACKEND_IMAGE ./backend'

                    echo "Building frontend image..."
                    sh 'docker build -t $FRONTEND_IMAGE -f frontend/Dockerfile .'
                }
            }
        }

        stage('Start Services with Docker Compose') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo "Checking if frontend is up..."
                    sh 'curl --retry 5 --retry-delay 3 http://localhost:3000 || echo "Frontend not reachable"'

                    echo "Checking if backend is up..."
                    sh 'curl --retry 5 --retry-delay 3 http://localhost:5001 || echo "Backend not reachable"'
                }
            }
        }

        stage('Teardown') {
            steps {
                echo "Shutting down Docker containers..."
                sh 'docker-compose down'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up Docker resources...'
            sh 'docker system prune -f'
        }
    }
}
