const { run } = require('./index');

run('yarn run cross-env NODE_ENV=development webpack --config configs/webpack.config.server.dev.js');
run('yarn run cross-env NODE_ENV=development webpack serve --config configs/webpack.config.renderer.dev.js');
