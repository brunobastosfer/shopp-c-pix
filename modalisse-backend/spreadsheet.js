require('dotenv').config({ path: '../.env.homologacao' })
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credenciais = require('../credenciais.json')

const doc = new GoogleSpreadsheet(
  '1wOocbNaqaXVthPLyhw63jOWOcnyHSmHrB3od3QwQ_4o'
)

const saveOrder = async (order) => {
  console.log('ORDER', order)
  await doc.useServiceAccountAuth({
    client_email: process.env.EMAIL_GOOGLE_API,
    private_key: credenciais.private_key,
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[1]
  const orderId = 123
  /*  const rows = order.items.map((item) => {
    const row = {
      'Pedido:': orderId,
      'Nome cliente:': order.nome,
      'Telefone cliente:': order.telefone,
      'Produto:': item.name,
      'Quantidade:': item.quantity,
      'Subtotal:': item.price * item.quantity,
      'Total pedido:': item.price * item.quantity,
      'Status:': 'Aguardando pagamento',
      'CPF:': order.cpf,
    }
    return row
  })
  await sheet.addRows(rows) */
}

module.exports = {
  saveOrder,
}
