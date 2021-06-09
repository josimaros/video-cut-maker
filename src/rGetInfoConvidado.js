const readline = require('readline-sync')
const Algorithmia = require('algorithmia')
const deteccaoDeSentenca = require('sbd')

async function getInfoConvidado(content) {
  content.serchTerm = inputTermoDePesquisa()
  content.wikipediaContentOriginal = await baixarConteudoDoWikipedia(content)
  limparConteudo(content)
  quebrancoConteudoEmSentencas(content)

  async function baixarConteudoDoWikipedia(content) {
    try {

      const input = {
        "articleName": content.serchTerm,
        "lang": "pt"
      }

      const apiKey = "simr9ofojbv3igiWBRJzJCg5Xwu1";
      const client = Algorithmia.client(apiKey);
      const wikipediaAlgorithmia = client.algo("web/WikipediaParser/0.1.2")
      const wikipediaResponse = await wikipediaAlgorithmia.pipe(input)
      const wikipediaContent = wikipediaResponse.get()

      return wikipediaContent.content

    } catch (error) {
      console.log('erro ao baixar conteudo do wikepedia', error)
    }
  }

  function inputTermoDePesquisa() {
    return readline.question('Digite o nome do conidado: ')
  }

  function limparConteudo(content){
    const semLinhasEmBrancoEMarcacoes = removeLinhasEmBrancoEMarcacoes(content.wikipediaContentOriginal)
    const semDatasEntreParenteses = removeDataEntreParenteses(semLinhasEmBrancoEMarcacoes)
    content.wikipediaContentLimpo = semDatasEntreParenteses

    function removeLinhasEmBrancoEMarcacoes(text){
      const todasAlLinhas = text.split('\n')
      const semLinhasEmBrancoEMarcacoes = todasAlLinhas.filter( (linha) => {
        if (linha.trim().length === 0 || linha.trim().startsWith('=')) {
          return false
        }
        return true
      })
      return semLinhasEmBrancoEMarcacoes.join(' ')
    }

    function removeDataEntreParenteses(text){
      return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, ' ')
    }

  }

  function quebrancoConteudoEmSentencas(content){
    content.sentecas = []
    const sentencas = deteccaoDeSentenca.sentences(content.wikipediaContentLimpo)
    sentencas.forEach( (sentenca) => {
      content.sentecas.push({
        text:sentenca,
        keyword: [],
        images:[]
      })
    })
    console.log(content)
  }

}
module.exports = getInfoConvidado;