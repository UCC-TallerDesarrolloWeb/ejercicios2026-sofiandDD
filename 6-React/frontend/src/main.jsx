import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@styles/index.scss'

import Layout from '@components/Layout'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Activities from '@pages/Activities'
import Poke from '@pages/Poke'
import Store from '@pages/Store'
import Cart from '@pages/Cart'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Layout renderiza Header + <Outlet/> + Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="actividades" element={<Activities />} />
          <Route path="poke" element={<Poke />} />
          <Route path="tienda" element={<Store />} />
          <Route path="carrito" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
