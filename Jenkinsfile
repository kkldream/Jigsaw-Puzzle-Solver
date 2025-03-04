pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh '''build_name=jenkins/${PROJECT_NAME}:${BRANCH_NAME}-${BUILD_NUMBER}

docker build \\
  -t ${build_name} \\
  .'''
      }
    }

    stage('Deploy') {
      parallel {
        stage('main') {
          when {
            branch 'main'
          }
          steps {
            withCredentials(bindings: [
                                          string(credentialsId: 'kk-mongodb_url', variable: 'MONGODB_URL'),
                                          string(credentialsId: 'kk-aws_access_key_id', variable: 'AWS_ACCESS_KEY_ID'),
                                          string(credentialsId: 'kk-aws_secret_access_key', variable: 'AWS_SECRET_ACCESS_KEY'),
                                          string(credentialsId: 'kk-aws_region', variable: 'AWS_REGION')
                                        ]) {
                sh '''run_name=jk-${PROJECT_NAME}-${BRANCH_NAME}
build_name=jenkins/${PROJECT_NAME}:${BRANCH_NAME}-${BUILD_NUMBER}

docker rm -f ${run_name}
docker run \\
  -d \\
  --restart=unless-stopped \\
  --name ${run_name} \\
  -p 53005:3000 \\
  -e MONGODB_URL=${MONGODB_URL} \\
  -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \\
  -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \\
  -e AWS_REGION=${AWS_REGION} \\
  ${build_name}'''
              }

            }
          }

        }
      }

      stage('Test') {
        steps {
          sh 'echo Not test yet!'
        }
      }

    }
    environment {
      PROJECT_NAME = 'jigsaw_puzzle_solver'
    }
    post {
      success {
        library 'shared-library'
        discord_notifaction true
      }

      unsuccessful {
        library 'shared-library'
        discord_notifaction false
      }

    }
  }