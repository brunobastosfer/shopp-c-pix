import Image from 'next/image'
import Link from 'next/link'

import { useCart } from '../../context/CartContext'
import { NavBarContainer } from './styles'

export function NavBar() {
  const cart = useCart()
  //const itemsCount = Object.keys(cart.cart).length
  const itemsCount = Object.keys(cart.cart).reduce((prev, curr) => {
    return prev + cart.cart[curr].quantity
  }, 0)
  return (
    <NavBarContainer>
      <div className='navBar__logo__content'>
        <Link href='/'>
          <a>
            <Image
              src={'/images/logo-modalisse.jpeg'}
              alt='Logo da Modalisse'
              width='130px'
              height='80px'
            />
          </a>
        </Link>
        <h1>Modalisse</h1>
      </div>
      <div className='navBar__link__content'>
        <a>
          <span>Home</span>
        </a>
        <a>
          <span>Items</span>
        </a>
        <a>
          <button>
            <Link href='/cart'>Carrinho</Link>
            {itemsCount > 0 && <span> ({itemsCount})</span>}
          </button>
        </a>
      </div>
    </NavBarContainer>
  )
}
