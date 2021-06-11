const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const { spawn, exec } = require('child_process');
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs').promises

async function RCutVideo() {

  const DuracaoVideo = 600
  let StartTime = 0
  let estarParado = true

  for (let I = 0; I <= 20; I++) {
    console.log('contando o video')
    await corteVideo(StartTime, DuracaoVideo)
    StartTime += DuracaoVideo
  }


  async function corteVideo(startTime, duracao) {

    const cmd = path.resolve(
      __dirname, 'scripts', 'ffmpeg.exe') +
      ' -ss ' + startTime + ' -t ' + duracao + ' -i ' +
      path.resolve(__dirname, 'video', 'in', 'original.mp4') +
      ' -vcodec copy -acodec copy ' +
      path.resolve(__dirname, 'video', 'out', 'saida-cut' + startTime + '.mp4')

    exec(cmd, {
      cwd: __dirname
    }, (err, stdout, stderr) => {
      // console.log(stdout,stderr,err);
      if (err) {
      }
    })
  }
}

module.exports = RCutVideo