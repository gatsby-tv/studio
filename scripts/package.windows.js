const { silent, run } = require('./index');
const fetch = require('node-fetch');
const { pipeline }  = require('stream');
const { promisify } = require('util');
const { createWriteStream } = require('fs');
const path = require('path');

var dapperDir = "./dapper";

async function downloadFile(url, file) {
  const streamPipeline = promisify(pipeline);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  await streamPipeline(response.body, file);
}

(async function () {
  try {
    if (!fs.existsSync(dapperDir)){
      fs.mkdirSync(dapperDir);
    }

    var dapperExe = createWriteStream(path.join(dapperDir, "dapper.exe"));
    await downloadFile("https://github.com/gatsby-tv/dapper/releases/download/v0.1.1/dapper.exe", dapperExe);
    var ffmpeg7z = createWriteStream(path.join(dapperDir, "ffmpeg.7z"));
    await downloadFile("https://www.gyan.dev/ffmpeg/builds/packages/ffmpeg-2021-06-09-git-e01bf559df-essentials_build.7z", ffmpeg7z);
    silent('7z e -o' + path.join(dapperDir, "ffmpeg") + ' ' + path.join(dapperDir, "ffmpeg.7z"));
    silent('rm -f ' + path.join(dapperDir, "ffmpeg.7z"));

    silent('rm -rf dist');
    run('yarn build');
    run('electron-builder build -w --publish never');
  }
  catch(error) {
    console.log(error);
  }
})();
