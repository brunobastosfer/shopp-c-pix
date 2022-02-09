import { MdOutlineAddShoppingCart } from 'react-icons/md'

import { CardItems } from './styles'

export function Card({ product }) {
  const addItem = (product) => () => {
    cart.addToCart(product)
  }

  return (
    <CardItems>
      <div className='cardItem__image__content'>
        <img src={product.data.image.url} />
      </div>
      <div className='cardItem__description__content'>
        <h1>{product.data.name}</h1>
        <p>R$: {product.data.price}</p>
        <button onClick={addItem(product)}>
          <span>Comprar</span>
          <MdOutlineAddShoppingCart size={16} />
        </button>
      </div>
    </CardItems>
  )
}
