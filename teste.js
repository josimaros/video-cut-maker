const ytdl = require('ytdl-core')
const youtubedl = require('youtube-dl-exec')
const fetch = require("node-fetch");


async function start() {
  let url = 'https://pt.wikipedia.org/w/api.php'
  const params = {
    action: "query",
    list: "search",
    srsearch: "Michael Jackson", //alterar
    format: "json"
}
  url = url + "?origin=*";
  Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

  fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        if (response.query.search[0].title === params.srsearch){
            console.log(response.query.search[0])
        }
    })
    .catch(function(error){console.log(error);});

}

start()