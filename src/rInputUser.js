const readline = require('readline-sync')

async function RInputUser(content){

  console.log('Robor[inputUser] -> Iniciado')

  content.urlPodCast = inputUrlPodcast()
  content.nomeDoConvidado = inputNomeConvidado()

  function inputUrlPodcast() {
    console.log('Robor[inputUser] -> recebendo url do podcast')
    return readline.question('Infome a url do podcast: ')
  }
  function inputNomeConvidado() {
    console.log('Robor[inputUser] -> recebendo nome do convidado')
    return readline.question('Informe o nome do convidado: ')
  }
  console.log('Robor[inputUser] -> Finalizado')
}

module.exports = RInputUser