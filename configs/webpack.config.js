const path = require('path');
const Dotenv = require('dotenv-webpack');

const { dependencies } = require('../app/package.json');

module.exports = {
  externals: [...Object.keys(dependencies || {})],

  output: {
    path: path.resolve(__dirname, '../app'),
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  experiments: {
    topLevelAwait: true,
  },

  plugins: [
    new Dotenv({
      defaults: true,
    }),
  ],
};
