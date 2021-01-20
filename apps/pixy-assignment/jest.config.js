const defaultConfig = require('../../configs/jest.config');
const { resolve } = require('path');

module.exports = {
  ...defaultConfig,
  displayName: 'pixy-assignment',
  projects: undefined,
  rootDir: resolve(__dirname),
};
