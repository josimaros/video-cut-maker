const robots = {
  botInputUsuario:require('./src/rGetInfoConvidado')
}

async function start () {
  const content = {}

  await robots.botInputUsuario(content)

}

start()