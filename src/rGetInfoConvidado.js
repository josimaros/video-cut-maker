const Algorithmia = require('algorithmia')
const deteccaoDeSentenca = require('sbd')

async function getInfoConvidado(content) {

  console.log('Robor[InfoConvidado] -> Iniciado')

  content.wikipediaContentOriginal = await baixarConteudoDoWikipedia(content)

  if (!content.wikipediaContentOriginal) {
    console.log('Robor[InfoConvidado] -> sem conteudo no wikipedia')
  } else {
    limparConteudo(content)
    quebrancoConteudoEmSentencas(content)
  }

  async function baixarConteudoDoWikipedia(content) {
    console.log('Robor[InfoConvidado] -> conteudo no wikipedia encontrado')

    try {

      const input = {
        "articleName": content.nomeDoConvidado,
        "lang": "pt"
      }

      const apiKey = "simr9ofojbv3igiWBRJzJCg5Xwu1";
      const client = Algorithmia.client(apiKey);
      const wikipediaAlgorithmia = client.algo("web/WikipediaParser/0.1.2")
      const wikipediaResponse = await wikipediaAlgorithmia.pipe(input)
      const wikipediaContent = wikipediaResponse.get()
      console.log('Robor[InfoConvidado] -> salvando conteudo')
      return wikipediaContent.content

    } catch (error) {
      console.log('Robor[InfoConvidado] -> erro ao realizado download de conteudo do wikipedia', error)
      return false
    }
  }

  function limparConteudo(content) {

    const semLinhasEmBrancoEMarcacoes = removeLinhasEmBrancoEMarcacoes(content.wikipediaContentOriginal)
    const semDatasEntreParenteses = removeDataEntreParenteses(semLinhasEmBrancoEMarcacoes)
    content.wikipediaContentLimpo = semDatasEntreParenteses

    function removeLinhasEmBrancoEMarcacoes(text) {
      console.log('Robor[InfoConvidado] -> retirando linhas em branco do conteudo')
      const todasAlLinhas = text.split('\n')
      const semLinhasEmBrancoEMarcacoes = todasAlLinhas.filter((linha) => {
        if (linha.trim().length === 0 || linha.trim().startsWith('=')) {
          return false
        }
        return true
      })
      console.log('Robor[InfoConvidado] -> finalizado a retirada de lihnas em branco')

      return semLinhasEmBrancoEMarcacoes.join(' ')
    }

    function removeDataEntreParenteses(text) {
      console.log('Robor[InfoConvidado] -> removendo data entre parenteses')
      return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, ' ')
    }

  }

  function quebrancoConteudoEmSentencas(content) {
    console.log('Robor[InfoConvidado] -> quebrando texto em sentenças')
    content.sentecas = []
    const sentencas = deteccaoDeSentenca.sentences(content.wikipediaContentLimpo)
    sentencas.forEach((sentenca) => {
      content.sentecas.push({
        text: sentenca,
        keyword: [],
        images: []
      })
    })
    console.log('Robor[InfoConvidado] -> finalizando quebrando texto em sentenças')
  }

  console.log('Robor[InfoConvidado] -> Finalizado')

}
module.exports = getInfoConvidado;