const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');

const config = require('./webpack.config');

const devtools =
  process.env.DEBUG_PROD === 'true' ? { devtool: 'source-map' } : {};

module.exports = merge(config, {
  ...devtools,
  mode: 'production',
  target: 'node',
  entry: './app/server.dev.ts',

  output: {
    filename: 'server.prod.js',
    path: path.resolve(__dirname, '../app/dist'),
    publicPath: './dist/',
  },

  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
    }),
  ],
});
