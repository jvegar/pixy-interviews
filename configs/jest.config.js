const { resolve } = require('path');

// prettier-ignore
module.exports = {
  rootDir: resolve(__dirname, '..'),
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    '<rootDir>/apps/test',
    '<rootDir>/apps/test',
    '<rootDir>/apps/test',
  ],
  transform: {
    '\\.js$': 'babel-jest',
  },
};
