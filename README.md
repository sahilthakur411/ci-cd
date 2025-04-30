# MERN Stack Application with CI/CD Pipeline

This project demonstrates a complete CI/CD pipeline for a MERN (MongoDB, Express, React, Node.js) stack application using Jenkins.

## Project Structure

```
mern-app/
├── client/                # React front-end
│   ├── public/            # Static files
│   ├── src/               # React source code
│   ├── Dockerfile         # Client Docker configuration
│   └── package.json       # Client dependencies
├── server/                # Express back-end
│   ├── Dockerfile         # Server Docker configuration
│   ├── package.json       # Server dependencies
│   ├── server.js          # Express server
│   └── server.test.js     # Server tests
├── docker-compose.yml     # Docker Compose configuration
├── Jenkinsfile            # Jenkins pipeline configuration
└── README.md              # Project documentation
```

## Prerequisites

- Node.js and npm
- Docker and Docker Compose
- Jenkins
- Git

## Setting up Jenkins

1. **Install Jenkins**:
   - Follow the [official Jenkins installation guide](https://www.jenkins.io/doc/book/installing/) for your platform.
   - Ensure Jenkins has access to Docker commands.

2. **Create a Jenkins Pipeline**:
   - In Jenkins, click "New Item".
   - Enter a name for your pipeline and select "Pipeline".
   - In the pipeline configuration, set "Definition" to "Pipeline script from SCM".
   - Set "SCM" to "Git" and enter your repository URL.
   - Specify the branch to build (e.g., `*/main`).
   - Set "Script Path" to "Jenkinsfile".
   - Click "Save".

3. **Add Docker Hub Credentials**:
   - In Jenkins, go to "Manage Jenkins" > "Manage Credentials".
   - Click on "Jenkins" under "Stores scoped to Jenkins".
   - Click on "Global credentials" and then "Add Credentials".
   - Set "Kind" to "Username with password".
   - Enter your Docker Hub username and password.
   - Set "ID" to "docker-hub-credentials".
   - Click "OK".

4. **Update Jenkinsfile**:
   - Edit the Jenkinsfile and update the `DOCKER_IMAGE_NAME_SERVER` and `DOCKER_IMAGE_NAME_CLIENT` variables with your Docker Hub username.

## Local Development

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd mern-app
   ```

2. **Install Dependencies**:
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Run the Application**:
   ```bash
   # Start the server
   cd ../server
   npm start
   
   # In a new terminal, start the client
   cd ../client
   npm start
   ```

## Running with Docker Compose

```bash
docker-compose up
```

This will start both the client and server in containers.

## CI/CD Pipeline

The CI/CD pipeline includes the following stages:

1. **Checkout**: Retrieves the code from the repository.
2. **Server Tests**: Runs tests for the server.
3. **Client Tests**: Runs tests for the client.
4. **Build Images**: Builds Docker images for both client and server.
5. **Push Images to DockerHub**: Pushes the Docker images to Docker Hub.
6. **Deploy**: Deploys the application.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the ISC License. 