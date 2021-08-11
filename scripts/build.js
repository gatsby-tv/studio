const { parallel } = require('./index');

parallel(
  'node scripts/build.main.js',
  'node scripts/build.server.js',
  'node scripts/build.renderer.js'
);
