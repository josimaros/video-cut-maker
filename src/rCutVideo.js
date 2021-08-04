const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const { spawn, exec } = require('child_process')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs').promises


async function RCutVideo(content) {

  console.log('Robor[CutVideo] -> Iniciado robor de cortes')

  const DuracaoVideo = 600
  let StartTime = 0
  console.log('Robor[CutVideo] -> calculando total de video')
  const totalDeCortes = Math.round(parseInt(content.infoVideo.duration) / 600)
  console.log(`Robor[CutVideo] -> total de videos: ${totalDeCortes}`)

  for (let I = 0; I <= totalDeCortes; I++) {
    await corteVideo(StartTime, DuracaoVideo, I, content)
    StartTime += DuracaoVideo
  }

  async function corteVideo(startTime, duracao, count, content) {
    console.log(`Robor[CutVideo] -> cortando video ${count}`)
    const cmd = path.resolve(__dirname, 'scripts', 'ffmpeg.exe') + ` -ss ${StartTime} -t ${DuracaoVideo} -i ` + path.resolve(__dirname, 'video', 'in', 'original.mp4') + ' -vcodec copy -acodec copy "' + path.resolve(__dirname, 'video', 'out', `Eu cortei podcats #${count} ${content.nomeDoConvidado}.mp4"`
    )
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
  console.log('Robor[CutVideo] -> finalizado robor de cortes')
}

module.exports = RCutVideo