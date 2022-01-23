require('dotenv').config({ path: '../.env.homologacao' })

const https = require('https')
const axios = require('axios')
const fs = require('fs')

const apiProduction = 'https://api-pix.gerencianet.com.br'
const apiHomolog = 'https://api-pix-h.gerencianet.com.br'

const baseUrl = process.env.GNV_ENV === 'producao' ? apiProduction : apiHomolog

const getToken = async () => {
  const certificado = fs.readFileSync('../' + process.env.GN_CERTIFICADO)
  const credenciais = {
    client_id: process.env.GN_CLIENT_ID,
    client_secret: process.env.GN_CLIENT_SECRET,
  }
  const data = JSON.stringify({ grant_type: 'client_credentials' })
  const dataCredenciais =
    credenciais.client_id + ':' + credenciais.client_secret
  const auth = Buffer.from(dataCredenciais).toString('base64')

  const agent = new https.Agent({
    pfx: certificado,
    passphrase: '',
  })

  const config = {
    method: 'POST',
    url: baseUrl + '/oauth/token',
    headers: {
      Authorization: 'Basic ' + auth,
      'Content-Type': 'application/json',
    },
    httpsAgent: agent,
    data: data,
  }
  const result = await axios(config)
  return result.data
}

const createCharge = async (accessToken, chargeData) => {
  const certificado = fs.readFileSync('../' + process.env.GN_CERTIFICADO)
  const data = JSON.stringify(chargeData)

  const agent = new https.Agent({
    pfx: certificado,
    passphrase: '',
  })

  const config = {
    method: 'POST',
    url: baseUrl + '/v2/cob',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    httpsAgent: agent,
    data: data,
  }
  const result = await axios(config)
  return result.data
}

const getLoc = async (accessToken, locID) => {
  const certificado = fs.readFileSync('../' + process.env.GN_CERTIFICADO)

  const agent = new https.Agent({
    pfx: certificado,
    passphrase: '',
  })

  const config = {
    method: 'GET',
    url: baseUrl + '/v2/loc/' + locID + '/qrcode',
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
    httpsAgent: agent,
  }
  const result = await axios(config)
  return result.data
}

const run = async () => {
  const chave = process.env.CHAVE_PIX
  const token = await getToken()
  const { access_token } = token

  const cob = {
    calendario: {
      expiracao: 3600,
    },
    devedor: {
      cpf: '12345678909',
      nome: 'Bruno Bastos',
    },
    valor: {
      original: '130.50',
    },
    chave,
    solicitacaoPagador: 'Cobrança do produto Modalisse',
  }
  const cobranca = await createCharge(access_token, cob)

  const qrcode = await getLoc(access_token, cobranca.loc.id)
  console.log(qrcode)
}

run()
