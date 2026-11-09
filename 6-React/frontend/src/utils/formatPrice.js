/**
 * Formatea un número como precio en pesos argentinos.
 * @param {number} price - ej: 35000.5
 * @returns {string} - ej: "$ 35.000,50"
 */
export const formatPrice = (price) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price)
