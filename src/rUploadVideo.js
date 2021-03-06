const express = require('express')
const google = require('googleapis').google
const youtube = google.youtube({ version: 'v3'})
const OAuth2 = google.auth.OAuth2
const fs = require('fs')

async function UploadVideoYoutube(content){

  await authenticateWithOAuth()
  const videoInformation = await uploadVideo(content)


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

  async function uploadVideo(content) {}

}

module.exports = UploadVideoYoutube