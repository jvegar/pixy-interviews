const defaultConfig = require('../../configs/jest.config');
const { resolve } = require('path');

module.exports = {
  ...defaultConfig,
  rootDir: resolve(__dirname),
  displayName: 'utils',
};
