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
  twitter_consumer_key: '${self:custom.twitter_consumer_key}',
  twitter_consumer_secret: '${self:custom.twitter_consumer_secret}',
  twitter_token_key: '${self:custom.twitter_token_key}',
  twitter_token_secret: '${self:custom.twitter_token_secret}',
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
    handler: 'src/twitterPublisher/function.handler',
    events: [
      {
        stream: {
          arn:
            'arn:aws:dynamodb:us-east-1:946932859547:table/waqi_feeds/stream/2021-01-20T20:56:08.674',
        },
      },
    ],
  },
};

module.exports = sls;
