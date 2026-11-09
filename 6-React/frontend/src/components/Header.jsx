import { NavLink, useNavigate } from 'react-router-dom'
import '@styles/Header.scss'

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  return (
    <header className="header">
      <h1 className="header__logo">Gym<span>UCC</span></h1>
      <nav className="header__nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/actividades">Actividades</NavLink>
        <NavLink to="/tienda">Tienda</NavLink>
        <NavLink to="/carrito">Carrito</NavLink>
        <NavLink to="/poke">Pokémon</NavLink>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header
