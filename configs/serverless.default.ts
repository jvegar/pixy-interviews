import type { Serverless } from 'serverless/aws';

const config: Serverless = {
  frameworkVersion: '2',
  service: 'default-config',
  plugins: ['serverless-webpack', 'serverless-offline'],

  custom: {
    stage: '${opt:stage, "dev"}',
    webpack: {
      packager: 'yarn',
      webpackConfig: '../../configs/webpack.config.js',
      individually: true,
    },
  },

  provider: {
    name: 'aws',
    region: 'us-east-1',
    runtime: 'nodejs12.x',
    timeout: 10,
    memorySize: 256,
    stage: '${self:custom.stage}',
    stackName: '${self:service}-${self:custom.stage}',
    stackTags: {
      STACK: '${self:service}',
      STAGE: '${self:custom.stage}',
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    deploymentBucket: {
      name: 'shiftpixy-devinterview',
      blockPublicAccess: true,
    },
  },
};

export default config;
