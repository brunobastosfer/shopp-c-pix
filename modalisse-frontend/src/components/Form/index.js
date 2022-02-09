import { useFormik } from 'formik'

import { FormContent } from './styles'

import { useCart } from '../../context/CartContext'

import axios from 'axios'

export function Form() {
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
          price: cart.car[curr].product.data.price,
          name: cart.cart[curr].product.data.name,
        }
        console.log(item)
        return item
      })
      console.log(order)
      order.items = items
      const result = await axios.post(
        'http://localhost:3001/create-order',
        values
      )
      console.log('O RETURN DO AXIOS', result.data)
    },
  })
  return (
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
  )
}
