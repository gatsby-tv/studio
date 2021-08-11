const { silent, run } = require('./index');

run('yarn build');
run('electron-builder build --publish never');
