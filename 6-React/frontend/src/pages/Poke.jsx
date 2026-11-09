import { useEffect, useState } from 'react'
import PokeCard from '@components/PokeCard'
import '@styles/Poke.scss'

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

const Poke = () => {
  const [pokemons, setPokemons] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Paso 1 era solo bulbasaur: fetch(`${BASE_URL}/1`)
    // Paso 2: del 1 al 20
    const cargar = async () => {
      try {
        const ids = Array.from({ length: 20 }, (_, i) => i + 1)
        const datos = await Promise.all(
          ids.map((id) => fetch(`${BASE_URL}/${id}`).then((r) => r.json()))
        )
        setPokemons(datos)
      } catch (err) {
        console.error('Error al traer pokémon', err)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  if (cargando) return <p className="aviso">Cargando pokémon...</p>

  return (
    <section className="poke">
      <h2>Pokédex (1 a 20)</h2>
      <div className="poke__grid">
        {pokemons.map((p) => (
          <PokeCard key={p.id} pokemon={p} />
        ))}
      </div>
    </section>
  )
}

export default Poke
