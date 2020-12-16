const nodeExternals = require('webpack-node-externals');
const sls = require('serverless-webpack');
const path = require('path');
const fs = require('fs');

// plugins
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// config
const babelConfig = require('./babel.config.js');
const tsconfigPath = getTsConfigPath();

module.exports = {
  target: 'node',
  entry: sls.lib.entries,
  context: sls.lib.serverless.config.servicePath,
  mode: sls.lib.webpack.isLocal ? 'development' : 'production',
  devtool: sls.lib.webpack.isLocal ? 'eval-cheap-source-map' : 'source-map',
  externals: getExternals(),
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    plugins: [new TsconfigPathsPlugin({ configFile: tsconfigPath })],
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: babelConfig.presets,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: tsconfigPath,
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        context: sls.lib.serverless.config.servicePath,
        configFile: tsconfigPath,
      },
    }),
  ],
};

// if there is a local tsconfig file, use it, otherwise get the root tsconfig.json
function getTsConfigPath() {
  const tsConfigInAppFolder = path.resolve(sls.lib.serverless.config.servicePath, 'tsconfig.json');
  const rootTsConfig = path.resolve(__dirname, '..', 'tsconfig.json');

  return fs.existsSync(tsConfigInAppFolder) ? tsConfigInAppFolder : rootTsConfig;
}

// In development, we exclude the bundling of modules coming from node_modules, therefore making the build
// faster while we are developing
function getExternals() {
  return sls.lib.webpack.isLocal
    ? [
        nodeExternals({
          modulesDir: path.resolve(__dirname, '..', 'node_modules'),
          allowlist: /^@package.*/,
        }),
      ]
    : [];
}
