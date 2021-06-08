import readline from 'readline-sync'

function start () {
  const content = {}
  content.serchTerm = inputTermoDePesquisa()

  function inputTermoDePesquisa ()  {
    return readline.question('Digite o nome do conidado: ')
  }

  console.log(content)
}

start()