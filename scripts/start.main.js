const { run } = require('./index');

run('yarn run cross-env NODE_ENV=development electron -r ./scripts/register.js app/main.dev.ts');
