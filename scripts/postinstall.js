const { run } = require('./index');

run('yarn run cross-env NODE_ENV=development webpack --config configs/webpack.config.renderer.dev.js');
run('yarn run yarn-deduplicate yarn.lock');
