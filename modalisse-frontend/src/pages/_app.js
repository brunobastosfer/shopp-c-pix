import { GlobalStyles } from '../styles/global'

import { CartProvider } from '../context/CartContext'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </>
  )
}

export default MyApp
