// Card genérica: recibe título, subtítulo y el resto del contenido como children
const Card = ({ title, subtitle, children }) => {
  return (
    <article className="card">
      <h3>{title}</h3>
      {subtitle && <p className="card__subtitle">{subtitle}</p>}
      {children}
    </article>
  )
}

export default Card
