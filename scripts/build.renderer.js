const { run } = require('./index');

run('yarn run cross-env NODE_ENV=production webpack --config configs/webpack.config.renderer.prod.js');
