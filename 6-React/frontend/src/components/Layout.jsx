import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '@components/Header'
import Footer from '@components/Footer'

const Layout = () => {
  // Guardamos si el usuario está logueado (persistido en localStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  )

  const login = () => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={logout} />
      <main>
        {/* Las páginas hijas acceden a esto con useOutletContext() */}
        <Outlet context={{ isLoggedIn, login }} />
      </main>
      <Footer />
    </>
  )
}

export default Layout
