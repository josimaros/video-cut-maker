const robots = {
  botInputUser: require('./src/rInputUser'),
  botDownVideoYoutube: require('./src/rDownVideo'),
  botCutVideo: require('./src/rCutVideo'),
  botGetInfoConvidado: require('./src/rGetInfoConvidado'),
  botTituloVideo: require('./src/rTituloVideo'),
  botUpvideo: require('./src/rUploadVideo'),
  botDeleteTemporarios: require('./src/limpaTemps')
}

async function start() {
  const content = {}

  await robots.botInputUser(content)
  // await robots.botDownVideoYoutube(content)
  await robots.botGetInfoConvidado(content)
  await robots.botCutVideo(content)
  // await robots.botUpvideo(content)
  // await robots.botDeleteTemporarios(content)

  console.log(content)

}

start()