const Algorithmia = require('algorithmia')
const deteccaoDeSentenca = require('sbd')
const youtubedl = require('youtube-dl-exec')

async function getInfoConvidado(content) {

  console.log('iniciando robor de capturas de informações do convidado')

  // content.wikipediaContentOriginal = await baixarConteudoDoWikipedia(content)
  content.wikipediaContentOriginal = false

  if (!content.wikipediaContentOriginal) {
    console.log('sem conteudo no wikipedia')
    await getTagsEDescricao(content)
  } else {
    limparConteudo(content)
    quebrancoConteudoEmSentencas(content)
    await getTagsEDescricao(content)
  }

  async function baixarConteudoDoWikipedia(content) {
    console.log('baixando conteudo do wikipedia')

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
      return wikipediaContent.content

    } catch (error) {
      console.log('erro ao baixar conteudo do wikepedia', error)
      return false
    }

  }

  function limparConteudo(content) {

    const semLinhasEmBrancoEMarcacoes = removeLinhasEmBrancoEMarcacoes(content.wikipediaContentOriginal)
    const semDatasEntreParenteses = removeDataEntreParenteses(semLinhasEmBrancoEMarcacoes)
    content.wikipediaContentLimpo = semDatasEntreParenteses

    function removeLinhasEmBrancoEMarcacoes(text) {
      console.log('iniciando a limpeza de linhas em branco')
      const todasAlLinhas = text.split('\n')
      const semLinhasEmBrancoEMarcacoes = todasAlLinhas.filter((linha) => {
        if (linha.trim().length === 0 || linha.trim().startsWith('=')) {
          return false
        }
        return true
      })
      console.log('finalizando a limpeza de linhas em branco')
      return semLinhasEmBrancoEMarcacoes.join(' ')
    }

    function removeDataEntreParenteses(text) {
      return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, ' ')
    }

  }

  function quebrancoConteudoEmSentencas(content) {
    content.sentecas = []
    const sentencas = deteccaoDeSentenca.sentences(content.wikipediaContentLimpo)
    sentencas.forEach((sentenca) => {
      content.sentecas.push({
        text: sentenca,
        keyword: [],
        images: []
      })
    })
  }

  async function getTagsEDescricao(content) {

    let descricaoConvidado = ''

    const infoVideo = await youtubedl(content.urlPodCast, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: content.urlPodCast
    })

    console.log(content.wikipediaContentOriginal)

    if (content.wikipediaContentOriginal) {
      for (let i = 0; i <= 15; i++) {
        descricaoConvidado += content.sentecas[i].text;
      }
    }


    content.tags = infoVideo.tags
    content.descricao = 'Seja muito bem vindo ao eu cortei poscasts onde os cortes sao feitos totalmente automatizados.' +
      '\n Se voce gosta do conteudo produzido, curte se inscreve e compartilha para ajudar o canal.' +
      '\n Todas as informações do canais de onde foram tirados os cortes vão estar na descrição.' +
      '\n \n ' + descricaoConvidado + 
      '\n \n' +'Canal: ' + infoVideo.uploader + ' ' + infoVideo.channel_url +
      '\n \n' + 'Contato: eucortei@gmail.com'
  }

  console.log('Finalizando robor de capturas de informações do convidado')

}
module.exports = getInfoConvidado;