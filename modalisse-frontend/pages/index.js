import Prismic from 'prismic-javascript'

const Index = (props) => {
  const { products } = props
  console.log(products)
  //const products = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className='flex flex-row flex-wrap space-x-1 space-y-1'>
      {products.map((product) => {
        return (
          <div className='bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700'>
            <a href='#'>
              <img
                className='rounded-t-lg p-8'
                src={product.data.image.url}
                alt='product image'
              />
            </a>
            <div className='px-5 pb-5'>
              <a href='#'>
                <h3 className='text-gray-900 font-semibold text-xl tracking-tight dark:text-white'>
                  {product.data.name}
                </h3>
              </a>
              <div className='flex items-center justify-between'>
                <span className='text-3xl font-bold text-gray-900 dark:text-white'>
                  R${product.data.price},00
                </span>
                <a
                  href='#'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  ADICIONAR NO CARRINHO
                </a>
              </div>
            </div>
          </div>
        )
      })}
    </div>
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
