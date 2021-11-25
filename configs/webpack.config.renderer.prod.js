const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const { spawn } = require('child_process');

const config = require('./webpack.config');

const port = process.env.PORT || 1212;
const devtools =
  process.env.DEBUG_PROD === 'true'
    ? {
        devtool: 'source-map',
      }
    : {};

module.exports = merge(config, {
  ...devtools,
  mode: 'production',
  target: 'electron-renderer',
  entry: ['core-js', 'regenerator-runtime/runtime', './app/index.tsx'],

  output: {
    filename: 'renderer.prod.js',
    path: path.resolve(__dirname, '../app/dist'),
    publicPath: './dist/',
  },

  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]__[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, '../app'),
                  require('@gatsby-tv/styles'),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          },
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      },
    ],
  },

  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
    }),
  ],
});
