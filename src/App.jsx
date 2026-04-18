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
      const response = await axios.get(`/api/pokemon/${pokemonName}`)
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
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Pokédex</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {pokemonList.map(pokemon => (
          <div
            key={pokemon.id}
            onClick={() => handlePokemonClick(pokemon.name)}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
              borderRadius: '10px',
              textAlign: 'center',
              transition: 'transform 0.2s',
              hover: { transform: 'scale(1.05)' }
            }}
          >
            {pokemon.image && (
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{ width: '100px', height: '100px' }}
              />
            )}
            <strong style={{ display: 'block', marginTop: '10px' }}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </strong>
            <small style={{ color: '#666' }}>
              Type: {pokemon.type.join(', ')}
            </small>
          </div>
        ))}
      </div>

      {selectedPokemon && !selectedPokemon.error && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          border: '2px solid #333',
          borderRadius: '10px',
          backgroundColor: '#f0f0f0',
          textAlign: 'center'
        }}>
          {selectedPokemon.image && (
            <img
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              style={{ width: '150px', height: '150px' }}
            />
          )}
          <h2>{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h2>
          <h3>Abilities:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {selectedPokemon.abilities && selectedPokemon.abilities.map(ability => (
              <li key={ability} style={{ display: 'inline-block', margin: '5px', padding: '5px 10px', backgroundColor: '#ddd', borderRadius: '5px' }}>
                {ability}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setSelectedPokemon(null)}
            style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}
          >
            Close
          </button>
        </div>
      )}

      {selectedPokemon && selectedPokemon.error && (
        <div style={{ marginTop: '20px', padding: '20px', border: '2px solid red', borderRadius: '10px' }}>
          <h2>{selectedPokemon.name}</h2>
          <p>Could not load abilities. Please check the console.</p>
          <button onClick={() => setSelectedPokemon(null)}>Close</button>
        </div>
      )}

      <footer style={{ textAlign: 'center', marginTop: '30px', padding: '20px', color: '#666' }}>
        Pokémon and Pokémon character names are trademarks of Nintendo.
      </footer>
    </div>
  )
}

export default App