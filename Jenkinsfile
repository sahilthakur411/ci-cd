pipeline {
    agent any
    
    environment {
        // Define environment variables
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
        DOCKER_IMAGE_NAME_SERVER = "your-docker-hub-username/mern-server"
        DOCKER_IMAGE_NAME_CLIENT = "your-docker-hub-username/mern-client"
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
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        
        stage('Client Tests') {
            steps {
                dir('client') {
                    // Install dependencies and run tests
                    sh 'npm install'
                    sh 'npm test -- --watchAll=false'
                }
            }
        }
        
        stage('Build Images') {
            steps {
                // Build Docker images
                sh 'docker-compose build'
            }
        }
        
        stage('Push Images to DockerHub') {
            steps {
                // Login to Docker Hub
                sh 'echo $DOCKER_HUB_CREDS_PSW | docker login -u $DOCKER_HUB_CREDS_USR --password-stdin'
                
                // Tag and push the server image
                sh "docker tag mern-server:latest $DOCKER_IMAGE_NAME_SERVER:latest"
                sh "docker push $DOCKER_IMAGE_NAME_SERVER:latest"
                
                // Tag and push the client image
                sh "docker tag mern-client:latest $DOCKER_IMAGE_NAME_CLIENT:latest"
                sh "docker push $DOCKER_IMAGE_NAME_CLIENT:latest"
            }
        }
        
        stage('Deploy') {
            steps {
                // Deploy the application
                // This could be deploying to a server, Kubernetes, etc.
                // For simplicity, we'll just restart our local containers
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
    
    post {
        always {
            // Clean up
            sh 'docker-compose down || true'
            sh 'docker logout'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
} 