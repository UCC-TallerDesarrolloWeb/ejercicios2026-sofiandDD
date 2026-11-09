import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Card from '@components/Card'
import { getActivities, getDiasSemana } from '@api/api'
// Unidad 6 (antes del fetch): import { activities, diasSemana } from '@data/activities'
import '@styles/Activities.scss'

const Activities = () => {
  const { isLoggedIn } = useOutletContext()
  const [activities, setActivities] = useState([])
  const [diasSemana, setDiasSemana] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const cargar = async () => {
      try {
        const [acts, dias] = await Promise.all([getActivities(), getDiasSemana()])
        setActivities(acts)
        // json-server necesita objetos: [{ id: '0', nombre: 'Domingo' }, ...]
        setDiasSemana(dias.map((d) => d.nombre))
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar las actividades. ¿Levantaste json-server? (npm run api)')
      }
    }
    cargar()
  }, [])

  const handleInscribir = (nombre) => alert(`¡Te inscribiste en ${nombre}!`)

  if (error) return <p className="aviso">{error}</p>

  return (
    <section className="activities">
      <h2>Actividades</h2>
      <div className="activities__grid">
        {activities.map((act) => (
          <Card key={act.id} title={act.nombre} subtitle={act.descripcion}>
            <ul>
              {act.horarios.map((h, i) => (
                <li key={i}>
                  {diasSemana[h.dia]}: {h['hora-inicio']} a {h['hora-fin']}
                </li>
              ))}
            </ul>
            {isLoggedIn && (
              <button onClick={() => handleInscribir(act.nombre)}>Inscribirme</button>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Activities
