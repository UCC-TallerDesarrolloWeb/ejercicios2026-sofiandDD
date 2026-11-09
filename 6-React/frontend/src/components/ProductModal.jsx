import { formatPrice } from '@utils/formatPrice'

// Ventana con el detalle de un producto
const ProductModal = ({ product, onClose, onAdd, isLoggedIn }) => {
  if (!product) return null

  return (
    <div className="modal__fondo" onClick={onClose}>
      {/* stopPropagation para que no se cierre al hacer click adentro */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__cerrar" onClick={onClose}>✕</button>
        <div className="modal__icono">{product.icono}</div>
        <h2>{product.nombre}</h2>
        <p className="modal__categoria">{product.categoria}</p>
        <p>{product.descripcion}</p>
        <p className="modal__precio">{formatPrice(product.precio)}</p>
        {isLoggedIn ? (
          <button onClick={() => onAdd(product)}>Agregar al carrito</button>
        ) : (
          <p className="aviso">Iniciá sesión para comprar</p>
        )}
      </div>
    </div>
  )
}

export default ProductModal
