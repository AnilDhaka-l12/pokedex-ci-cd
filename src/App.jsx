import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [pokemonList, setPokemonList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  useEffect(() => {
    axios.get('/api/pokemon')
      .then(response => {
        setPokemonList(response.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching pokemon list:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handlePokemonClick = async (pokemonName) => {
    try {
      console.log('Fetching:', pokemonName)
      const response = await axios.get(`/api/pokemon/${pokemonName}`)
      console.log('Response:', response.data)
      setSelectedPokemon(response.data)
    } catch (err) {
      console.error('Error fetching pokemon details:', err)
      setSelectedPokemon({ 
        name: pokemonName, 
        abilities: ['Unable to load abilities'],
        error: true
      })
    }
  }

  if (loading) return <div>Loading Pokemon...</div>
  if (error) return <div data-testid="error">Error: {error}</div>

  return (
    <div>
      <h1>Pokédex</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {pokemonList.map(pokemon => (
          <div 
            key={pokemon.id} 
            onClick={() => handlePokemonClick(pokemon.name)}
            style={{ 
              border: '1px solid #ccc', 
              padding: '10px', 
              cursor: 'pointer',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px'
            }}
          >
            <strong>{pokemon.name}</strong>
          </div>
        ))}
      </div>
      
      {selectedPokemon && !selectedPokemon.error && (
        <div style={{ marginTop: '20px', padding: '20px', border: '2px solid #333', borderRadius: '10px' }}>
          <h2>{selectedPokemon.name}</h2>
          <h3>Abilities:</h3>
          <ul>
            {selectedPokemon.abilities && selectedPokemon.abilities.map(ability => (
              <li key={ability}>{ability}</li>
            ))}
          </ul>
          <button onClick={() => setSelectedPokemon(null)}>Close</button>
        </div>
      )}
      
      {selectedPokemon && selectedPokemon.error && (
        <div style={{ marginTop: '20px', padding: '20px', border: '2px solid red', borderRadius: '10px' }}>
          <h2>{selectedPokemon.name}</h2>
          <p>Could not load abilities. Please check the console.</p>
          <button onClick={() => setSelectedPokemon(null)}>Close</button>
        </div>
      )}
      
      <footer>
        Pokémon and Pokémon character names are trademarks of Nintendo.
      </footer>
    </div>
  )
}

export default App