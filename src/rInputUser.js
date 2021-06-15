const readline = require('readline-sync')

async function RInputUser(content){

  console.log('Iniciando robo de input de usuario')

  content.urlPodCast = inputUrlPodcast()
  content.nomeDoConvidado = inputNomeConvidado()

  function inputUrlPodcast() {
    return readline.question('Infome a url do podcast: ')
  }
  function inputNomeConvidado() {
    return readline.question('Informe o nome do convidado: ')
  }
  console.log('Finalizado robo de input de usuario')
}

module.exports = RInputUser