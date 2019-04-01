podTemplate(
    label: 'slave', 
    cloud: 'kubernetes',
    serviceAccount: 'jenkins',
    containers: [
        containerTemplate(
            name: 'docker', 
            image: 'docker:dind', 
            ttyEnabled: true, 
            alwaysPullImage: true, 
            privileged: true,
            command: 'dockerd --host=unix:///var/run/docker.sock --host=tcp://0.0.0.0:2375 --storage-driver=overlay'
        ),
        containerTemplate(
            name: 'node',
            image: 'node:8.12.0-alpine',
            workingDir: '/home/jenkins',
            ttyEnabled: true,
            privileged: true,
            command: 'cat'
        ),
        containerTemplate(
            name: 'kubectl', 
            image: 'lachlanevenson/k8s-kubectl:latest', 
            command: 'cat', 
            ttyEnabled: true
        )
    ],
   volumes: [
       emptyDirVolume(
           memory: false, 
           mountPath: '/var/lib/docker'
        )
    ]
) {
    node('slave') {
        def PROJECT      = 'sophosstore'
        def SERVICENAME  = 'wsrestsecurity'
        def AWS_REGION   = 'us-east-2'
        def REGISTRY_URL = "https://887482798966.dkr.ecr.us-east-2.amazonaws.com"
        def IMAGEVERSION = "beta"
        def NAMESPACE    = 'dev'
        def IMAGETAG     = "$PROJECT/$SERVICENAME:$IMAGEVERSION"

        stage('Checkout code') {
            checkout scm
        }
        
        container('node') {
            stage('Install dependencies') {
                sh 'npm install'
            }
            stage('Scann Code') {
                def scannerHome = tool 'SonarScanner';
                withSonarQubeEnv('SonarQube') {
                    sh "${scannerHome}/bin/sonar-scanner"
                }
            }

        }//node

        container('docker') {
            stage('Build app') {
                sh 'bin/Dockerfile.dev'
            }
            stage('Create image') {
                docker.withRegistry("$REGISTRY_URL", "ecr:us-east-2:aws") {
                    image = docker.build("$IMAGETAG")
                    image.inside {
                        sh 'ls -alh'
                    }
                    image.push()
                }
            }
        }//docker

        container('kubectl') {
            stage('Deploy image') {
                sh "kubectl get ns $NAMESPACE || kubectl create ns $NAMESPACE"
                sh "kubectl get pods --namespace $NAMESPACE"
                sh "sed -i.bak 's#$PROJECT/$SERVICENAME:$IMAGEVERSION#$IMAGETAG#' ./k8s/dev/*.yaml"
                sh "kubectl --namespace=$NAMESPACE apply -f k8s/dev/configmap.yaml"
                sh "kubectl --namespace=$NAMESPACE apply -f k8s/dev/deployment.yaml"
                sh "kubectl --namespace=$NAMESPACE apply -f k8s/dev/service.yaml"
                sh "echo http://`kubectl --namespace=$NAMESPACE get service/$SERVICENAME --output=json jsonpath='{.status.loadBalancer.ingress[0].ip}'` > $SERVICENAME"
            }
        }

    }//node
}//podTemplate