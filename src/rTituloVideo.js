const path = require('path')
const fs = require('fs').promises
const fs2 = require('fs')
var filesize = require('filesize');

async function RTituloVideo() {
  listaDeArquivos = await fs.readdir(path.resolve(__dirname, 'video', 'out'))

  for (i = 0; i < listaDeArquivos.length; i++) {
    const video = fs2.statSync(path.resolve(__dirname, 'video', 'out', listaDeArquivos[i]))
    const tamanhoArquivo = filesize(video.size, { round: 0 }).split(' ')
    if(tamanhoArquivo[0] > 1 && tamanhoArquivo[1] === 'MB' ){
      console.log('upload')
    }
  }

}

module.exports = RTituloVideo;