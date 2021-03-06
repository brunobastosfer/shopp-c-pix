require('dotenv').config({ path: '../env.producao' })

const https = require('https')
const fs = require('fs')
const app = require('./app')

const options = {
  //tls
  key: fs.readFileSync(
    '/etc/letsencrypt/live/api-modalisse.brunobastos.dev/privkey.pem'
  ),
  certificado: fs.readFileSync(
    '/etc/letsencrypt/live/api-modalisse.brunobastos.dev/fullchain.pem'
  ),
  //mtls
  ca: fs.readFileSync('./ca-gerencianet.crt'), //gerencianet
  minVersion: 'TLSv1.2',
  requestCert: true,
  rejectUnauthorized: false,
}

//----
const server = https.createServer(options, app)
server.listen(443, console.log('rodando'))
//----
