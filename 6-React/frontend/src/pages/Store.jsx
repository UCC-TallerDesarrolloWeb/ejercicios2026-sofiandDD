import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ProductModal from '@components/ProductModal'
import { getProducts, addToCart } from '@api/api'
import { formatPrice } from '@utils/formatPrice'
import '@styles/Store.scss'

const Store = () => {
  const { isLoggedIn } = useOutletContext()
  const [products, setProducts] = useState([])
  const [seleccionado, setSeleccionado] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => {
        console.error(err)
        setError('No se pudieron cargar los productos. ¿Levantaste json-server? (npm run api)')
      })
  }, [])

  const handleAdd = async (product) => {
    try {
      await addToCart(product)
      setMensaje(`${product.nombre} agregado al carrito ✔`)
      setTimeout(() => setMensaje(''), 2000)
    } catch (err) {
      console.error(err)
    }
  }

  if (error) return <p className="aviso">{error}</p>

  return (
    <section className="store">
      <h2>Tienda</h2>
      {!isLoggedIn && <p className="aviso">Iniciá sesión para agregar productos al carrito.</p>}
      {mensaje && <p className="store__mensaje">{mensaje}</p>}

      <div className="store__grid">
        {products.map((p) => (
          <article key={p.id} className="store__card">
            <div className="store__icono">{p.icono}</div>
            <h3>{p.nombre}</h3>
            <p className="store__precio">{formatPrice(p.precio)}</p>
            <div className="store__botones">
              <button className="secundario" onClick={() => setSeleccionado(p)}>Ver detalle</button>
              {isLoggedIn && <button onClick={() => handleAdd(p)}>Agregar</button>}
            </div>
          </article>
        ))}
      </div>

      <ProductModal
        product={seleccionado}
        isLoggedIn={isLoggedIn}
        onClose={() => setSeleccionado(null)}
        onAdd={(p) => {
          handleAdd(p)
          setSeleccionado(null)
        }}
      />
    </section>
  )
}

export default Store
