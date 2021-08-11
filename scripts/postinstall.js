const { run, parallel } = require('./index');

parallel(
  'yarn run cross-env NODE_ENV=development webpack --config configs/webpack.config.renderer.dev.js',
  'yarn run cross-env NODE_ENV=development webpack --config configs/webpack.config.server.dev.js'
);
