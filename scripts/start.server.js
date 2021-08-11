const { run } = require('./index');

run('yarn run cross-env NODE_ENV=development webpack serve --config configs/webpack.config.server.dev.js');
