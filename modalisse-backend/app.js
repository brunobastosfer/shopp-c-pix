const express = require('express')
const cors = require('cors')
const { saveOrder } = require('./lib/spreadsheet')
const { createPixCharge } = require('./lib/pix')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send({ ok: true })
})

app.post('/create-order', async (request, response) => {
  const { qrcode, cobranca } = await createPixCharge(request.body)
  await saveOrder({ ...request.body, id: cobranca.txid })
  response.send({ ok: 'ok', qrcode, cobranca })
})

module.exports = app
