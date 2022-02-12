import { useFormik } from 'formik'
import { useState } from 'react'

import { FormContent, Resume } from './styles'

import { useCart } from '../../context/CartContext'

import axios from 'axios'

export function Form() {
  const [orderStatus, setOrderStatus] = useState('pre-order') // pedindo, pedido recebido
  const [qrcode, setQRCode] = useState('')
  const cart = useCart()

  const form = useFormik({
    initialValues: {
      cpf: '',
      nome: '',
      telefone: '',
    },
    onSubmit: async (values) => {
      const order = { ...values }
      const items = Object.keys(cart.cart).map((curr) => {
        const item = {
          quantity: cart.cart[curr].quantity,
          price: cart.cart[curr].product.data.price,
          name: cart.cart[curr].product.data.name,
        }
        return item
      })
      order.items = items
      setOrderStatus('ordering')
      const result = await axios.post(
        'http://localhost:3001/create-order',
        order
      )
      console.log(result)
      setQRCode(result.data.qrcode.imagemQrcode)
      console.log(qrcode)
      setOrderStatus('order-received')
    },
  })

  const itemsCount = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantity
  }, 0)

  const total = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantity * cart.cart[curr].product.data.price
  }, 0)

  return (
    <>
      {orderStatus === 'pre-order' && (
        <FormContent onSubmit={form.handleSubmit}>
          <p>Seus dados</p>
          <div>
            <label>
              Seu nome:
              <input
                type='text'
                name='nome'
                id='nome'
                placeholder='Seu nome'
                value={form.values.nome}
                onChange={form.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Seu CPF:
              <input
                type='text'
                name='cpf'
                id='cpf'
                placeholder='Seu CPF'
                value={form.values.cpf}
                onChange={form.handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Seu telefone:
              <input
                type='text'
                name='telefone'
                id='telefone'
                placeholder='Whatsapp'
                value={form.values.telefone}
                onChange={form.handleChange}
              />
            </label>
          </div>
          <button type='submit'>CONCLUIR PEDIDO</button>
        </FormContent>
      )}
      {orderStatus === 'ordering' && <p>Pedido sendo realizado. Aguarde ...</p>}
      {orderStatus === 'order-received' && (
        <>
          <p>Efetue o pagamento com o QRCode abaixo:</p>
          <img src={qrcode} />
        </>
      )}
      <Resume>
        <p>Seu pedido</p>
        <div>
          <p>
            Quantidade de items
            <span> {itemsCount}</span>
          </p>
          <p>
            Total
            <span> R${Number(total).toFixed(2).replace('.', ',')}</span>
          </p>
        </div>
      </Resume>
    </>
  )
}
