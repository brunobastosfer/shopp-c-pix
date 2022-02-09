import Prismic from 'prismic-javascript'
import { NavBar } from '../components/NavBar'
import { Card } from '../components/Card'
import Head from 'next/head'

import { Container, CardContent } from '../styles/home'

const Index = (props) => {
  const { products } = props
  return (
    <>
      <Head>
        <title>Modalisse</title>
      </Head>
      <Container>
        <NavBar />
        <CardContent>
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </CardContent>
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

export default Index
