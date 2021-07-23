const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const { spawn, exec } = require('child_process')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs').promises


async function RConcatIntroVideo(content) {

  getListaDeVideosUploads()


  async function getListaDeVideosUploads(content) {

    const listaDeArquivos = await fs.readdir(path.resolve(__dirname, 'video', 'out'))

    for (let I = 0; I < listaDeArquivos.length; I++) {

      let videoConcact = listaDeArquivos[I]

      console.log('iniciando junção do video')
      await concatVideo(videoConcact, I)

    }

  }

  async function concatVideo(videoSrc, contador) {

    fs.writeFile(path.resolve(__dirname, 'video', 'intro', `list${contador}.txt`), `file '${path.resolve(__dirname, 'video', 'intro', 'intro.mp4')}' \r\nfile '${path.resolve(__dirname, 'video', 'out', videoSrc)}'`, function (erro) {

      if (erro) {
        throw erro;
      }
    });

    // const cmd = path.resolve(__dirname, 'scripts', 'ffmpeg.exe') + ` -f concat -safe 0 -i ${path.resolve(__dirname, 'video', 'intro', 'list.txt')} -c copy ${path.resolve(__dirname, 'video', 'forUpload', videoSrc).replace("''","'")}`
    const cmd = path.resolve(__dirname, 'scripts', 'ffmpeg.exe') + ` -f concat -safe 0 -i "${path.resolve(__dirname, 'video', 'intro', `list${contador}.txt`)}" -c copy "${path.resolve(__dirname, 'video', 'forUpload', videoSrc).replace("''", "'")}"`

    setTimeout(() => {

      return new Promise(function (resolve, reject) {

        exec(cmd, {
          cwd: __dirname
        }, (err, stdout, stderr) => {
          // console.log(stdout,stderr,err);
          if (err) {
            reject()
          }
        })
      }
      )

    }, 2000);


  }
}

module.exports = RConcatIntroVideo