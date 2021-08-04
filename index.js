
const robots = {
  inputUser:require('./src/rInputUser'),
  getInfoConvidade:require('./src/rGetInfoConvidado'),
  getInfoVideoYoutube:require('./src/rInfoVideo'),
  geraDescricao:require('./src/rDescricaoCompleta'),
  downloadVideoYoutube:require('./src/rDownVideo'),
  cortadorDeVideo:require('./src/rCutVideo'),
  colocaIntroVideo:require('./src/RConcatIntroVideo')
}

async function start () {
  console.log('Robor[DownVidoYoutube] -> inciado robor de download de videos do youtube')
  const content = {}

  // await robots.inputUser(content)
  // // await robots.getInfoConvidade(content)
  // await robots.getInfoVideoYoutube(content)
  // await robots.geraDescricao(content)
  // await robots.downloadVideoYoutube(content)
  // await robots.cortadorDeVideo(content)
  await robots.colocaIntroVideo(content)

  
  // console.log(content.infoVideo.tags)
  // console.log(content.descricaoPronta)
  console.log('Robor[DownVidoYoutube] -> finalizado robor de download de videos do youtube')
}

start()