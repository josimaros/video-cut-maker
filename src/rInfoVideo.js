const youtubedl = require('youtube-dl-exec')

async function InfoVideo(content){
  console.log('Robor[InfoVideo] -> Iniciado')

  await getInfoVideo(content)

  console.log('Robor[InfoVideo] -> Finalizado')

  async function getInfoVideo(content){

    const infoVideo = await youtubedl(content.urlPodCast, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: content.urlPodCast
    })

    console.log('Robor[InfoVideo] -> Salvando informações no content')
    content.infoVideo = infoVideo

  }
}

module.exports = InfoVideo