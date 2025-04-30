pipeline {
    agent any
    
    environment {
        // Define environment variables
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
        DOCKER_IMAGE_NAME_SERVER = "sahil2619/mern-server"
        DOCKER_IMAGE_NAME_CLIENT = "sahil2619/mern-client"
        NODE_ENV = "test"
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Check out the repository
                checkout scm
            }
        }
        
        stage('Server Tests') {
            steps {
                dir('server') {
                    // Install dependencies and run tests
                    bat 'npm install --no-audit --no-fund'
                    bat 'npm test'
                }
            }
            post {
                failure {
                    echo 'Server tests failed!'
                }
            }
        }
        
        stage('Client Tests') {
            steps {
                dir('client') {
                    // Install dependencies and run tests
                    bat 'npm install --no-audit --no-fund'
                    bat 'npm test -- --watchAll=false --passWithNoTests'
                }
            }
            post {
                failure {
                    echo 'Client tests failed!'
                }
            }
        }
        
        stage('Build Images') {
            steps {
                // Build Docker images directly
                bat 'cd server && docker build -t mern-server .'
                bat 'cd client && docker build -t mern-client .'
                bat 'docker images'
            }
        }
        
        stage('Push Images to DockerHub') {
            steps {
                // Login to Docker Hub
                bat 'echo %DOCKER_HUB_CREDS_PSW%| docker login -u %DOCKER_HUB_CREDS_USR% --password-stdin'
                
                // Tag and push the server image
                bat "docker tag mern-server:latest %DOCKER_IMAGE_NAME_SERVER%:latest"
                bat "docker push %DOCKER_IMAGE_NAME_SERVER%:latest"
                
                // Tag and push the client image
                bat "docker tag mern-client:latest %DOCKER_IMAGE_NAME_CLIENT%:latest"
                bat "docker push %DOCKER_IMAGE_NAME_CLIENT%:latest"
            }
        }
        
        stage('Deploy') {
            steps {
                // Deploy the application
                // For simplicity, we'll run them directly instead of using docker-compose
                bat 'docker stop mern-server mern-client || exit 0'
                bat 'docker rm mern-server mern-client || exit 0'
                bat 'docker run -d -p 5000:5000 --name mern-server %DOCKER_IMAGE_NAME_SERVER%:latest'
                bat 'docker run -d -p 80:80 --name mern-client %DOCKER_IMAGE_NAME_CLIENT%:latest'
            }
        }
    }
    
    post {
        always {
            // Clean up
            bat 'docker logout'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
} 