require('dotenv').config({ path: '../.env.homologacao' })
const fs = require('fs')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciais = require('../credenciais.json')

const doc = new GoogleSpreadsheet(
  '1wOocbNaqaXVthPLyhw63jOWOcnyHSmHrB3od3QwQ_4o'
)

const run = async () => {
  await doc.useServiceAccountAuth({
    client_email: process.env.EMAIL_GOOGLE_API,
    private_key: credenciais.private_key,
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[1]
  await sheet.addRows([
    {
      'Pedido:': 123,
      'Nome cliente:': 'Bruno Bastos POC',
      'Telefone cliente:': '85 996945419',
      'Produto:': 'Bolsa de Mão',
      'Quantidade:': 1,
      'Subtotal:': 80,
      'Total pedido:': 80,
      'Status:': 'Aguardando pagamento',
    },
  ])
}

run()
