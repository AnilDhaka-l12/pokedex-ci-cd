import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const PokemonPage = () => {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios.get(`/api/pokemon/${name}`)
      .then(response => {
        setPokemon(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching pokemon:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [name])

  if (loading) return <div>Loading Pokemon...</div>
  if (error) return <div>Error: {error}</div>
  if (!pokemon) return <div>Pokemon not found</div>

  // Extract ability names - handle both string and object formats
  const getAbilityNames = () => {
    if (!pokemon.abilities) return []
    return pokemon.abilities.map(ability => {
      if (typeof ability === 'string') return ability
      if (ability.ability && ability.ability.name) return ability.ability.name
      if (ability.name) return ability.name
      return 'Unknown ability'
    })
  }

  const abilityNames = getAbilityNames()

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <div>
        <h3>Type:</h3>
        <ul>
          {pokemon.type && pokemon.type.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Abilities:</h3>
        <ul>
          {abilityNames.map((ability, index) => (
            <li key={index}>{ability}</li>
          ))}
        </ul>
      </div>
      <Link to="/">Back to Pokédex</Link>
    </div>
  )
}

export default PokemonPage