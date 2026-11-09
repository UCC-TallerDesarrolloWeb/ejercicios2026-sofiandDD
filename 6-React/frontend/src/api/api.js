// Todas las llamadas al backend mockeado con json-server
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'

const request = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}/${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`Error ${res.status} en /${path}`)
  return res.json()
}

// ---- Actividades ----
export const getActivities = () => request('activities')
export const getDiasSemana = () => request('diasSemana')

// ---- Productos ----
export const getProducts = () => request('products')

// ---- Carrito ----
export const getCart = () => request('cart')

export const addToCart = async (product) => {
  const cart = await getCart()
  const existente = cart.find((item) => item.productId === product.id)
  if (existente) {
    return updateQty(existente.id, existente.qty + 1)
  }
  const { id, ...datos } = product
  return request('cart', {
    method: 'POST',
    body: JSON.stringify({ ...datos, productId: id, qty: 1 }),
  })
}

export const updateQty = (itemId, qty) =>
  request(`cart/${itemId}`, { method: 'PATCH', body: JSON.stringify({ qty }) })

export const removeFromCart = (itemId) =>
  request(`cart/${itemId}`, { method: 'DELETE' })
