import '@styles/Home.scss'
// Imágenes en src/assets: se importan y Vite les arma la ruta
import funcional from '@assets/home/funcional.jpg'
import zumba from '@assets/home/zumba.jpg'

// Imágenes en public: se usan con ruta absoluta desde la raíz
const cards = [
  { titulo: 'Taekwondo', img: '/home/taekwondo.jpg' },
  { titulo: 'Yoga', img: '/home/yoga.webp' },
  { titulo: 'Funcional', img: funcional },
  { titulo: 'Zumba', img: zumba },
]

const Home = () => {
  return (
    <section className="home">
      <h2>Nuestras actividades</h2>
      <div className="home__grid">
        {cards.map((c) => (
          <article key={c.titulo} className="home__card">
            <img src={c.img} alt={c.titulo} />
            <h3>{c.titulo}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Home
