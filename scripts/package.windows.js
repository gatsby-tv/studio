const { silent, run } = require('./index');
const https = require('https');
const fs = require('fs');
const path = require('path');

var dapperDir = "./dapper";
var file = fs.createWriteStream(path.join(dapperDir, "dapper.exe"));

function downloadDapper() {
	return new Promise((resolve, reject) => {
    https.get("https://github.com/gatsby-tv/dapper/releases/download/v0.1.1/dapper.exe", (response) => {
      response.pipe(file);
      file.on('finish', function() {
        file.close();
      });

      response.on('end', () => {
        resolve();
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
  });
}

(async function () {
  try {
    if (!fs.existsSync(dapperDir)){
      fs.mkdirSync(dapperDir);
    }
    await downloadDapper();

    silent('rm -rf dist');
    run('yarn build');
    run('electron-builder build -w --publish never');
  }
  catch(error) {
    console.log(error);
  }
})();
