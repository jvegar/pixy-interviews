const { resolve } = require('path');

// prettier-ignore
module.exports = {
  rootDir: resolve(__dirname, '..'),
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [],
  transform: {
    '\\.js$': 'babel-jest',
  },
};
