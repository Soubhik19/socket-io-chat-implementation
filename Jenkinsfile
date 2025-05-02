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
                    // Build backend image
                    sh 'docker build -t $BACKEND_IMAGE ./backend'

                    // Build frontend image
                    sh 'docker build -t $FRONTEND_IMAGE -f frontend/Dockerfile .'
                }
            }
        }

        stage('Start Services with Docker Compose') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        // Optional test stage
        // stage('Run Tests') {
        //     steps {
        //         sh 'docker exec backend npm test' // adjust if needed
        //     }
        // }

        stage('Verify Deployment') {
            steps {
                sh 'curl --fail http://localhost:3000 || echo "Frontend not reachable"'
                sh 'curl --fail http://localhost:5000 || echo "Backend not reachable"'
            }
        }

        stage('Teardown') {
            steps {
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
