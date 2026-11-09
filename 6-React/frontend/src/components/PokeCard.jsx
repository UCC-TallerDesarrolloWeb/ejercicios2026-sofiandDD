const PokeCard = ({ pokemon }) => {
  return (
    <article className="poke-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <span className="poke-card__id">#{pokemon.id}</span>
      <h3>{pokemon.name}</h3>
      <div className="poke-card__types">
        {pokemon.types.map((t) => (
          <span key={t.type.name}>{t.type.name}</span>
        ))}
      </div>
    </article>
  )
}

export default PokeCard
