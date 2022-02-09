import { useCart } from '../../context/CartContext'

export function TableProduct() {
  const cart = useCart()

  const remove = (id) => () => {
    cart.removeFromCart(id)
  }

  const changeQuantity = (id) => (event) => {
    cart.changeQuantity(id, Number(event.target.value))
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>PRODUTO</th>
          <th>QUANTIDADE</th>
          <th>PREÇO UNITÁRIO</th>
          <th>PREÇO TOTAL</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(cart.cart).map((key) => {
          const { product, quantity } = cart.cart[key]
          return (
            <tr key={product.id}>
              <td>
                <img src={product.data.image.url} />
              </td>
              <td>
                <p>{product.data.name}</p>
                <button onClick={remove(key)}>
                  <small>(Remover item)</small>
                </button>
              </td>
              <td>
                <input
                  type='number'
                  defaultValue={quantity}
                  onBlur={changeQuantity(key)}
                />
              </td>
              <td>
                <p>
                  {' '}
                  R$ {Number(product.data.price).toFixed(2).replace('.', ',')}
                </p>
              </td>
              <td>
                <p>
                  R$
                  {Number(product.data.price * quantity)
                    .toFixed(2)
                    .replace('.', ',')}
                </p>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
