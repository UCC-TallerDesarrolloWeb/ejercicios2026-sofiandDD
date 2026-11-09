import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
// Versión 1 (CSS tradicional): import '@styles/Login.css'
// Versión 2 (SASS):
import '@styles/Login.scss'

const Login = () => {
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useOutletContext()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (usuario === 'admin' && password === 'admin') {
      console.log('Login OK')
      login()
      navigate('/actividades')
    } else {
      console.log('Login Incorrecto')
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <label htmlFor="usuario">Usuario</label>
        <input
          id="usuario"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="login__error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}

export default Login
