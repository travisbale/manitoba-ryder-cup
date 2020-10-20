pipeline {
  agent {
    docker {
      image 'node:14-alpine3.10'
      args '-p 3000:3000'
    }
  }

  environment {
    ENV_FILE = "${env.BRANCH_NAME == 'master' ? 'prod.env' : 'staging.env'}"
    DEPLOY_DIR = "${env.BRANCH_NAME == 'master' ? 'prod' : 'staging'}"
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Test') {
      steps {
        sh 'npm run test:unit'
      }
    }

    stage('Build') {
      steps {
        sh 'cp /home/env/vue/$ENV_FILE .env.production'
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        sh 'rm -rf /home/html/$DEPLOY_DIR/*'
        sh 'cp -aT dist /home/html/$DEPLOY_DIR'
      }
    }
  }
}
