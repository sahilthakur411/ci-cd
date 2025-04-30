pipeline {
    agent any
    
    environment {
        // Define environment variables
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
        DOCKER_IMAGE_NAME_SERVER = "sahil2619/mern-server"
        DOCKER_IMAGE_NAME_CLIENT = "sahil2619/mern-client"
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
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }
        
        stage('Client Tests') {
            steps {
                dir('client') {
                    // Install dependencies and run tests
                    bat 'npm install'
                    bat 'npm test -- --watchAll=false'
                }
            }
        }
        
        stage('Build Images') {
            steps {
                // Build Docker images
                bat 'docker-compose build'
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
                // This could be deploying to a server, Kubernetes, etc.
                // For simplicity, we'll just restart our local containers
                bat 'docker-compose down || exit 0'
                bat 'docker-compose up -d'
            }
        }
    }
    
    post {
        always {
            // Clean up
            bat 'docker-compose down || exit 0'
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