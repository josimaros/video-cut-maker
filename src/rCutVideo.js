const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const { spawn, exec } = require('child_process')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs').promises


async function RCutVideo(content) {

  const DuracaoVideo = 600
  let StartTime = 0
  const totalDeCortes = Math.round(parseInt(content.detalheDoVideo.tempoDoVideo) / 600)
  console.log(totalDeCortes)

  for (let I = 0; I <= totalDeCortes; I++) {
    console.log('contando o video')
    await corteVideo(StartTime, DuracaoVideo, I, content)
    StartTime += DuracaoVideo
  }

  async function corteVideo(startTime, duracao, count, content) {
    console.log('corte executado', startTime, duracao, count,content.nomeDoConvidado)

    const cmd = path.resolve(__dirname,'scripts','ffmpeg.exe') + ` -ss ${StartTime} -t ${DuracaoVideo} -i `+ path.resolve(__dirname,'video','in','original.mp4') + ' -vcodec copy -acodec copy "' + path.resolve(__dirname,'video','out',`Eu cortei podcats #${count} ${content.nomeDoConvidado}.mp4"`
    )

      console.log(cmd)

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
  }
}

module.exports = RCutVideo