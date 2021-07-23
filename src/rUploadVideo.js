const express = require('express')
const google = require('googleapis').google
const youtube = google.youtube({ version: 'v3' })
const OAuth2 = google.auth.OAuth2
const fs = require('fs')
const fs2 = require('fs').promises
const path = require('path')


async function UploadVideoYoutube(content) {

  await getListaDeVideosUploads(content)
  await authenticateWithOAuth()

  for (let i = 0; i < content.srcListVideos.length; i++) {
    const videoInformation = await uploadVideo(
      content.srcListVideos[i], 
      fs.statSync(content.srcListVideos[i]).size, 
      `Eu cortei podcats #${i} ${content.nomeDoConvidado}`, 
      content.tags, 
      content.descricao)
  }


  async function authenticateWithOAuth() {
    const webServer = await startWebServer()
    const OAuthClient = await createOAuthClient()
    requestUserConsent(OAuthClient)
    const authorizationToken = await waitForGoogleCallback(webServer)
    await requestGoogleForAccessTokens(OAuthClient, authorizationToken)
    await setGlobalGoogleAuthentication(OAuthClient)
    await stopWebServer(webServer)

    async function startWebServer() {
      return new Promise((resolve, reject) => {
        const port = 5000
        const app = express()

        const server = app.listen(port, () => {
          console.log(`> [youtube-robot] Listening on http://localhost:${port}`)

          resolve({
            app,
            server
          })
        })
      })
    }

    async function createOAuthClient() {
      const credentials = require('./credencias/client_secret_310314265815-ciknljhusnsnum2vesp6bd9vu3b0no1b.apps.googleusercontent.com.json')

      const OAuthClient = new OAuth2(
        credentials.web.client_id,
        credentials.web.client_secret,
        credentials.web.redirect_uris[0]
      )

      return OAuthClient
    }

    function requestUserConsent(OAuthClient) {
      const consentUrl = OAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/youtube']
      })

      console.log(`> [youtube-robot] Please give your consent: ${consentUrl}`)
    }

    async function waitForGoogleCallback(webServer) {
      return new Promise((resolve, reject) => {
        console.log('> [youtube-robot] Waiting for user consent...')

        webServer.app.get('/oauth2callback', (req, res) => {
          const authCode = req.query.code
          console.log(`> [youtube-robot] Consent given: ${authCode}`)

          res.send('<h1>Thank you!</h1><p>Now close this tab.</p>')
          resolve(authCode)
        })
      })
    }

    async function requestGoogleForAccessTokens(OAuthClient, authorizationToken) {
      return new Promise((resolve, reject) => {
        OAuthClient.getToken(authorizationToken, (error, tokens) => {
          if (error) {
            return reject(error)
          }

          console.log('> [youtube-robot] Access tokens received!')

          OAuthClient.setCredentials(tokens)
          resolve()
        })
      })
    }

    function setGlobalGoogleAuthentication(OAuthClient) {
      google.options({
        auth: OAuthClient
      })
    }

    async function stopWebServer(webServer) {
      return new Promise((resolve, reject) => {
        webServer.server.close(() => {
          resolve()
        })
      })
    }
  }

  async function uploadVideo(dirPath, fileSize, title, tags, descricao) {

    const videoFilePath = dirPath
    const videoFileSize = fs.statSync(videoFilePath).size
    const videoTitle = title
    const videoTags = tags
    const videoDescription = descricao


    const requestParameters = {
      part: 'snippet, status',
      requestBody: {
        snippet: {
          title: videoTitle,
          description: videoDescription,
          tags: videoTags
        },
        status: {
          privacyStatus: 'unlisted'
        }
      },
      media: {
        body: fs.createReadStream(videoFilePath)
      }
    }

    console.log('> [youtube-robot] Starting to upload the video to YouTube')
    const youtubeResponse = await youtube.videos.insert(requestParameters, {
      onUploadProgress: onUploadProgress
    })

    console.log(`> [youtube-robot] Video available at: https://youtu.be/${youtubeResponse.data.id}`)
    return youtubeResponse.data

    function onUploadProgress(event) {
      const progress = Math.round((event.bytesRead / videoFileSize) * 100)
      console.log(`> [youtube-robot] ${progress}% completed`)
    }
  }


  async function getListaDeVideosUploads(content) {
    content.srcListVideos = []
    listaDeArquivos = await fs2.readdir(path.resolve(__dirname, 'video', 'out'))
    if (listaDeArquivos) {
      for (i = 0; i < listaDeArquivos.length; i++) {
        const video = path.resolve(__dirname, 'video', 'out', listaDeArquivos[i])
        content.srcListVideos.push(video)
      }
    }
  }
}

module.exports = UploadVideoYoutube