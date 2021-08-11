const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const chalk = require('chalk');
const { merge } = require('webpack-merge');
const { spawn } = require('child_process');

const port = process.env.PORT || 1212;

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  entry: ['core-js', 'regenerator-runtime/runtime', './app/index.tsx'],

  output: {
    filename: 'renderer.dev.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: `http://localhost:${port}/dist/`,
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
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, '../app')],
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
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],

  resolve: {
    alias: {
      react: path.resolve(__dirname, '../node_modules/react'),
    },
  },

  devServer: {
    port,
    publicPath: `http://localhost:${port}/dist`,
    compress: true,
    noInfo: false,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100,
    },
    before: () => {
      console.log(chalk.bold('Starting Main Process...'));
      spawn('yarn', ['start:main'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', process.exit)
        .on('error', console.error);
    },
  },
});
