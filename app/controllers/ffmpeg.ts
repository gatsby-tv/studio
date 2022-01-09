import { messenger } from '@app/messenger';
import process from 'child_process';
import path from 'path';

// TODO: Little bit of a hack to get the ffmpeg executable path due to path changes, should fix root cause
const ffmpegPath = path.dirname(require.resolve('ffmpeg-static')) + '/ffmpeg';

messenger.subscribe('ffmpeg.about', () => {
  console.log('path', ffmpegPath);
  const about = process.spawn(ffmpegPath, ['-h']);

  about.stdout.on('data', (data: Buffer) => {
    console.log('ffmpeg.about', data.toString());
  });

  about.stderr.on('data', (data: Buffer) => {
    console.log('ffmpeg.about err', data.toString());
  });
});
