import Prismic from 'prismic-javascript'
import Head from 'next/head'

import { useCart } from '../context/CartContext'
import { NavBar } from '../components/NavBar'
import { Form } from '../components/Form'
import { TableProduct } from '../components/TableProduct'

import { Container, MainContent } from '../styles/cart'

const Cart = (props) => {
  const { products } = props
  const cart = useCart()

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
