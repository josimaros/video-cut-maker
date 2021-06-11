const robots = {
  botInputUsuario:require('./src/rGetInfoConvidado'),
  botCutVideo:require('./src/rCutVideo'),
  botTituloVideo:require('./src/r.titulo-video'),
  botUpvideo:require('./src/r-upload-video')
}

async function start () {
  const content = {}

  // await robots.botInputUsuario(content)
  // await robots.botCutVideo()
  // await robots.botTituloVideo()
  console.log('inicio')
  await robots.botUpvideo()
  console.log('depois')

}

start()