const express = require('express')
const cors = require('cors')
const { saveOrder } = require('./spreadsheet')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send({ ok: true })
})

app.post('/create-order', async (request, response) => {
  console.log(request.body)
  //await saveOrder(request.body)
  response.send({ ok: 'ok' })
})

app.listen(3001, (err) => {
  console.log('Rodando na porta 3001')
})
