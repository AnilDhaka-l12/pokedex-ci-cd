import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const PokemonPage = () => {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/api/pokemon/${name}`)
      .then(response => {
        setPokemon(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [name])

  if (loading) return <div>Loading...</div>
  if (!pokemon) return <div>Pokemon not found</div>

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <div>
        <h3>Abilities:</h3>
        <ul>
          {pokemon.abilities && pokemon.abilities.map(ability => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>
      </div>
      <Link to="/">Back to Pokédex</Link>
    </div>
  )
}

export default PokemonPage