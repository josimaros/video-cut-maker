

async function GerarDescricao(content){
  const qtdSentenca = 10
  let Descricao = ''
  for (let I = 0; I < qtdSentenca; I++) {
    try {
      
      if(content.sentecas[I]){
        Descricao += content.sentecas[I];
      }
    } catch (error) {
      Descricao += ''
    }
  }

  content.descricaoPronta = `
  Seja muito bem vindo ao canal Eu Cortei PodCast, onde os cortes sao feitos totalmente automatizados.
  Se você gosta do conteudo produzido, curte se inscreve e compartilha para ajudar o canal.
  Todas as informações do canais de onde foram tirados os cortes vão estar na descrição.
  ${Descricao === '' ? Descricao + '\n' : ''} 
  Convidados: ${content.infoVideo.title}
  Canal: ${content.infoVideo.channel} - ${content.infoVideo.uploader_url} \n
  Contato: eucortei@gmail.com
  `
}

module.exports = GerarDescricao