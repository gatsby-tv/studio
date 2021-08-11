const { parallel } = require('./index');

parallel(
  'yarn run cross-env NODE_ENV=development electron -r ./scripts/register.js app/main.dev.ts',
  'yarn run cross-env NODE_ENV=development webpack serve --config configs/webpack.config.server.dev.js'
);
