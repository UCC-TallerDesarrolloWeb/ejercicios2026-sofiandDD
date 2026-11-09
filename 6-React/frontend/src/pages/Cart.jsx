import { useEffect, useState } from 'react'
import { getCart, updateQty, removeFromCart } from '@api/api'
import { formatPrice } from '@utils/formatPrice'
import '@styles/Store.scss'

const Cart = () => {
  const [cart, setCart] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getCart()
      .then(setCart)
      .catch((err) => {
        console.error(err)
        setError('No se pudo cargar el carrito. ¿Levantaste json-server? (npm run api)')
      })
  }, [])

  const cambiarCantidad = async (item, delta) => {
    const qty = item.qty + delta
    if (qty < 1) return
    await updateQty(item.id, qty)
    setCart((prev) => prev.map((p) => (p.id === item.id ? { ...p, qty } : p)))
  }

  const eliminar = async (id) => {
    await removeFromCart(id)
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  const total = cart.reduce((acc, item) => acc + item.precio * item.qty, 0)

  if (error) return <p className="aviso">{error}</p>

  return (
    <section className="cart">
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p className="aviso">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart__lista">
            {cart.map((item) => (
              <li key={item.id} className="cart__item">
                <span className="cart__icono">{item.icono}</span>
                <span className="cart__nombre">{item.nombre}</span>
                <div className="cart__qty">
                  <button onClick={() => cambiarCantidad(item, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => cambiarCantidad(item, 1)}>+</button>
                </div>
                <span>{formatPrice(item.precio * item.qty)}</span>
                <button className="secundario" onClick={() => eliminar(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <p className="cart__total">Total: {formatPrice(total)}</p>
        </>
      )}
    </section>
  )
}

export default Cart
