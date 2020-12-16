---
to: apps/<%= h.changeCase.param(name) %>/jest.config.js
---
const defaultConfig = require('../../configs/jest.config');
const { resolve } = require('path');

module.exports = {
  ...defaultConfig,
  displayName: '<%= h.changeCase.param(name) %>',
  projects: undefined,
  rootDir: resolve(__dirname),
};
