const youtubedl = require('youtube-dl-exec')
const path = require('path')
const fs = require('fs');
const http = require('https');
const { pipeline } = require('stream');

async function RDownVidoYoutube(content) {

  console.log('Robor[DownVidoYoutube] -> Iniciado')
  console.log('Robor[DownVidoYoutube] -> Iniciano escolha do video de download')
  for (let i = 0; i < content.infoVideo.formats.length; i++) {
    if (content.infoVideo.formats[i].ext === 'mp4' && content.infoVideo.formats[i].acodec !== 'none' && content.infoVideo.formats[i].height >= 720) {
      console.log('Robor[DownVidoYoutube] -> Criando arquivo de download')
      const file = fs.createWriteStream(path.resolve(__dirname, 'video', 'in', `original.${content.infoVideo.formats[i].ext}`));

      await download(content.infoVideo.formats[i].url, file)
      console.log('Robor[DownVidoYoutube] -> Finalizado')
    }
  }

  async function download(url, path) {
    console.log('Robor[DownVidoYoutube] -> download inciado')
    return new Promise(function (resolve, reject) {
      http.get(url, response => {
        pipeline(
          response,
          path,
          err => {
            if (err) {
              console.log('Robor[DownVidoYoutube] -> erro ao realizar download', err)
              reject()
            } else {
              console.log('Robor[DownVidoYoutube] -> download finalizado')
              resolve()
            }
          }
        )
      })
    })
  };

  console.log('Robor[DownVidoYoutube] -> Finalizado')

}

module.exports = RDownVidoYoutube