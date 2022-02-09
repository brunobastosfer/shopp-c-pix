import Prismic from 'prismic-javascript'
import Head from 'next/head'

import { useCart } from '../context/CartContext'
import { NavBar } from '../components/NavBar'
import { Form } from '../components/Form'
import { TableProduct } from '../components/TableProduct'

import { Container, MainContent, Resume } from '../styles/cart'

const Cart = (props) => {
  const { products } = props
  const cart = useCart()

  const itemsCount = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantity
  }, 0)

  const total = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantity * cart.cart[curr].product.data.price
  }, 0)

  return (
    <>
      <Head>
        <title>Carrinho | Modalisse</title>
      </Head>
      <NavBar />
      <Container>
        <TableProduct />
        <MainContent>
          <Form />
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
        </MainContent>
      </Container>
    </>
  )
}

export async function getServerSideProps({ res }) {
  const client = Prismic.client('https://modalisse-shop.prismic.io/api/v2')
  const products = await client.query(
    Prismic.Predicates.at('document.type', 'product')
  )
  return {
    props: {
      products: products.results,
    },
  }
}

export default Cart
