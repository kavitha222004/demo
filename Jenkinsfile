pipeline{
    agent any
     environment {
     SCANNER_HOME = tool 'sonar-scanner'
    }
    stages {
        stage('clean workspace'){
            steps{
                cleanWs()
            }
        }
        stage('Checkout from Git'){
            steps{
                git 'https://github.com/Sushmaa123/Mern_Chat.git'
            }
        }
         stage('OWASP FS SCAN') {
             steps {
             withCredentials([string(credentialsId: 'nvd-api-key', variable: 'NVD_API_KEY')]) {
            dependencyCheck additionalArguments: """
            --scan ./ \
            --disableYarnAudit \
            --disableNodeAudit \
            --nvdApiKey ${NVD_API_KEY}
            """, odcInstallation: 'DP-Check'
             }
            dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
       }
        stage("Sonarqube Analysis "){
            steps{
                withSonarQubeEnv('sonar-server') {
                    sh ''' ${SCANNER_HOME}/bin/sonar-scanner \
                    -Dsonar.projectName=mern-chat \
                    -Dsonar.projectKey=mern-chat'''
                }
            }
        }
    

        stage('TRIVY FS SCAN') {
            steps {
                sh "trivy fs . > trivyfs.txt"     
            }
        }
        
       stage('Docker Compose Build & Up') {
            steps {
                sh "docker-compose up -d"
            }
        }
        stage('Docker push') {
            steps {
                withDockerRegistry(credentialsId: 'docker-cred', url: 'https://index.docker.io/v1/') {
                    sh "docker push sushmaagowdaa/mern-backend"
                    sh "docker push sushmaagowdaa/mern-frontend"
               }
            }
        }
        stage("TRIVY"){
            steps{
                sh "trivy image sushmaagowdaa/mern-backend > trivy-backend.txt"
                sh "trivy image sushmaagowdaa/mern-frontend > trivy-frontend.txt"

            }
        }
    
    }
}    
