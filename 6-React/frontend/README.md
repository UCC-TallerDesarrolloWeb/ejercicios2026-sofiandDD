# Gym UCC - React + Vite (Unidades 6 y 7)

## Cómo correrlo (en la terminal de VS Code)

```bash
cd 6-React/frontend
npm install          # solo la primera vez
```

Terminal 1 (backend mockeado con json-server):
```bash
npm run api          # = npx json-server src/data/db.json --port 4000
```

Terminal 2 (frontend):
```bash
npm run dev          # abrir http://localhost:5173
```

Usuario y contraseña del login: `admin` / `admin`

## Qué hay en cada carpeta

| Carpeta | Contenido |
|---|---|
| `src/components` | Layout (Outlet), Header, Footer, Card (children), PokeCard, ProductModal |
| `src/pages` | Home, Login, Activities, Poke, Store, Cart |
| `src/styles` | SCSS de cada página + `_variables.scss` con mixins. `Login.css` es la versión con CSS tradicional |
| `src/data` | `activities.js` (datos locales U6), `activities.json` y `productos.json` (mocks U7), `db.json` (todo junto, es el que usa `npm run api`) |
| `src/api` | `api.js`: todos los `fetch` al backend (GET, POST, PATCH, DELETE) |
| `src/utils` | `formatPrice.js` |
| `public/home` y `src/assets/home` | Imágenes de la Home (2 y 2) |

Los alias (`@components`, `@pages`, `@styles`, etc.) están en `vite.config.js`.
La URL del backend está en `.env` (`VITE_API_URL`).

> Nota: usamos un único `db.json` porque json-server levanta un solo archivo por puerto,
> así actividades, productos y carrito andan juntos en el puerto 4000.
