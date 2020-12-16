---
to: apps/<%= h.changeCase.param(name) %>/serverless.ts
---
import sls from '../../configs/serverless.default';

sls.service = '<%= h.changeCase.param(name) %>';

sls.plugins = [
  'serverless-webpack', 
  'serverless-offline'
];

sls.provider.environment = {
  STAGE: '${self:custom.stage}',
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1,
};

sls.functions = {
  hello: {
    handler: 'src/handler.default',
    events: [
      {
        http: { method: 'get', path: '/hello' },
      },
    ],
  },
};

module.exports = sls;
