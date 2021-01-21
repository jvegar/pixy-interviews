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
    tableNameStations: 'waqi_stations',
    tableNameFeeds: 'waqi_feeds',
    waqi_token: 'a1e6f87ae43188eeeb7f95b7e704532792ea3cd1',
    waqi_baseurl: 'https://api.waqi.info/feed',
    twitter_consumer_key: 'R2rHEP9DWYxtvyKfbAXSRW7hu',
    twitter_consumer_secret: 'm6YDzlVYdcJA0u1cnvpFIDOd6IIZS07IzXIrTBNtwcrSuHVa4U',
    twitter_token_key: '121160454-wjBorfkRa62BPUj68yKpvrPXk7juL5dlmvJcKx1v',
    twitter_token_secret: 'MRTq7lTweuVXMzlJ8oK1P70qRMSuxCoXyAYjeZDuGIXo2',
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
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Query',
          'dynamodb:Scan',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
          'dynamodb:DescribeStream',
          'dynamodb:GetRecords',
          'dynamodb:GetShardIterator',
          'dynamodb:ListStreams',
        ],
        Resource: 'arn:aws:dynamodb:us-east-1:*:*',
      },
      {
        Effect: 'Allow',
        Action: ['sns:Publish'],
        Resource: '*',
      },
    ],
  },
};

export default config;
