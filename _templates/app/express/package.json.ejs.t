---
to: apps/<%= h.changeCase.param(name) %>/package.json
sh: "yarn"
---
{
  "name": "@apps/<%= h.changeCase.param(name) %>",
  "version": "0.0.1",
  "license": "MIT",
  "private": true,
  "scripts": {
    "start": "sls offline",
    "test": "jest",
    "deploy": "sls deploy"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "serverless-http": "^2.6.0"
  }
}
