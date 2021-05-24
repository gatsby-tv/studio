const { silent, run } = require('./index');

silent('rm -rf dist');
run('yarn build');
run('electron-builder build --publish never');
