const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const { spawn, exec } = require('child_process')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs').promises
const ytdl = require('ytdl-core')

async function RCutVideo() {

  const detalheDoVideo = await ytdl.getBasicInfo('https://www.youtube.com/watch?v=E4R_cEKecIU')

  const DuracaoVideo = 600
  let StartTime = 0
  const totalDeCortes = parseInt(detalheDoVideo.videoDetails.lengthSeconds/600) + 1

  for (let I = 0; I <= totalDeCortes; I++) {
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


    return new Promise(function (resolve, reject) {

      exec(cmd, {
        cwd: __dirname
      }, (err, stdout, stderr) => {
        // console.log(stdout,stderr,err);
        if (err) {
          reject()
        }
      })
      resolve()
    }
    )

    // exec(cmd, {
    //   cwd: __dirname
    // }, (err, stdout, stderr) => {
    //   // console.log(stdout,stderr,err);
    //   if (err) {
    //   }
    // })
  }
}

module.exports = RCutVideo