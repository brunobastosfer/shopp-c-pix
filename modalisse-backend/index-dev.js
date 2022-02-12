require('dotenv').config({ path: '../env.homologacao' })

const app = require('./app')

app.listen(3001, (err) => {
  if (err) {
    console.log('Servidor não iniciado')
    console.log(err)
  }
  console.log('Rodando na porta 3001')
})
