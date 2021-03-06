const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');

const config = require('./webpack.config');

const port = process.env.SERVER_PORT || 1214;

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'node',
  entry: './app/server.dev.ts',

  output: {
    filename: 'server.dev.js',
    path: path.resolve(__dirname, '../dist'),
  },

  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],

  devServer: {
    port,
    writeToDisk: true,
    compress: true,
    noInfo: false,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100,
    },
  },
});
