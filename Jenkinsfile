pipeline {
  agent {
    docker {
      image 'node:14-alpine3.10'
      args '-p 3000:3000'
    }
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
        sh 'npm run build'
      }
    }
    stage('Deploy to Staging') {
      when {
        branch 'staging'
      }
      steps {
        sh 'rm -rf /home/html/staging/*'
        sh 'cp -aT dist /home/html/staging'
      }
    }
    stage('Deploy to Production') {
      when {
        branch 'master'
      }
      steps {
        sh 'rm -rf /home/html/prod/*'
        sh 'cp -aT dist /home/html/prod'
      }
    }
  }
}
