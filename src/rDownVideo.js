const youtubedl = require('youtube-dl-exec')
const path = require('path')
const fs = require('fs');
const http = require('https');
const { pipeline } = require('stream');

async function RDownVidoYoutube(content) {

  console.log('Iniciando robor de download de videos do youtube')

  const infoVideo = await youtubedl(content.urlPodCast, {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    referer: 'https://www.youtube.com/watch?v=E4R_cEKecIU'
  })

  for (let i = 0; i < infoVideo.formats.length; i++) {
    if (infoVideo.formats[i].ext === 'mp4' && infoVideo.formats[i].acodec !== 'none' && infoVideo.formats[i].height >= 720) {

      const file = fs.createWriteStream(path.resolve(__dirname, 'video', 'in', `original.${infoVideo.formats[i].ext}`));

      await download(infoVideo.formats[i].url,file)

    }
  }

  content.tags = infoVideo.tags

  async function download(url, path) {
    return new Promise(function (resolve, reject) {
      http.get(url, response => {
        pipeline(
          response,
          path,
          err => {
            if(err){
              console.error('Pipeline failed.', err);
              reject()
            }else{
              console.log('Pipeline succeeded.');
              resolve()
            }
          }
        )
      })
    })
  };

  console.log('Finalizando robor de download de videos do youtube')

}

module.exports = RDownVidoYoutube