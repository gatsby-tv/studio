const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const { merge } = require('webpack-merge');

const devtools =
  process.env.DEBUG_PROD === 'true' ? { devtool: 'source-map' } : {};

module.exports = merge(config, {
  ...devtools,
  mode: 'production',
  target: 'electron-main',
  entry: './app/main.dev.ts',

  output: {
    filename: 'main.prod.js',
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
    }),
  ],
});
