import Aws from 'serverless/aws';
import sls from '../../configs/serverless.default';

sls.service = 'pixy-assignment';

sls.plugins = ['serverless-webpack', 'serverless-offline'];

sls.provider.environment = {
  STAGE: '${self:custom.stage}',
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1,
  tableNameStations: '${self:custom.tableNameStations}',
  tableNameFeeds: '${self:custom.tableNameFeeds}',
  waqi_token: '${self:custom.waqi_token}',
  waqi_baseurl: '${self:custom.waqi_baseurl}',
  twitter_token: '${self:custom.twitter_token}',
  twitter_baseurl: '${self:custom.twitter_baseurl}',
};

sls.functions = {
  createStation: {
    handler: 'src/db/stations/create.main',
    events: [
      {
        http: { method: 'post', path: '/stations' },
      },
    ],
  },
  getStation: {
    handler: 'src/db/stations/get.main',
    events: [
      {
        http: { method: 'get', path: '/stations/{id}' },
      },
    ],
  },
  listStations: {
    handler: 'src/db/stations/list.main',
    events: [
      {
        http: { method: 'get', path: '/stations/' },
      },
    ],
  },
  updateStation: {
    handler: 'src/db/stations/update.main',
    events: [
      {
        http: { method: 'put', path: '/stations/{id}' },
      },
    ],
  },
  deleteStation: {
    handler: 'src/db/stations/delete.main',
    events: [
      {
        http: { method: 'delete', path: '/stations/{id}' },
      },
    ],
  },
  getFeed: {
    handler: 'src/feedProcessor/function.main',
    events: [
      {
        http: { method: 'get', path: '/feeduris' },
      },
    ],
  },
  publishFeed: {
    handler: '',
    events: [
      {
        stream: { arn: 'Fn::GetAtt: [MyDynamoDbTable, StreamArn]' },
      },
    ],
  },
};

module.exports = sls;
