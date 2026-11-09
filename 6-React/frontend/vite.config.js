import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Alias para no tener que escribir ../../ en los imports
const ruta = (carpeta) => fileURLToPath(new URL(`./src/${carpeta}`, import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': ruta('components'),
      '@pages': ruta('pages'),
      '@styles': ruta('styles'),
      '@assets': ruta('assets'),
      '@data': ruta('data'),
      '@api': ruta('api'),
      '@utils': ruta('utils'),
    },
  },
})
