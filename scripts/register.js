const path = require('path');

require('@babel/register')({
  extensions: ['.es6', '.es', '.js', '.jsx', '.mjs', '.ts', '.tsx'],
  cwd: path.resolve(__dirname, '..'),
});
