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
        console.error('Error:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handlePokemonClick = async (pokemonName) => {
    try {
      const response = await axios.get(`/api/pokemon/${pokemonName}`)
      setSelectedPokemon(response.data)
    } catch (err) {
      console.error('Error fetching details:', err)
    }
  }

  const closeModal = () => {
    setSelectedPokemon(null)
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading Pokemon...</div>
  if (error) return <div data-testid="error" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error: {error}</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Pokédex</h1>

      {/* Pokemon Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {pokemonList.map(pokemon => (
          <div
            key={pokemon.id}
            onClick={() => handlePokemonClick(pokemon.name)}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9'
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

      {/* Modal Popup */}
      {selectedPokemon && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '15px',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h2>
            {selectedPokemon.image && (
              <img
                src={selectedPokemon.image}
                alt={selectedPokemon.name}
                style={{ width: '150px', height: '150px' }}
              />
            )}
            <h3>Abilities:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {selectedPokemon.abilities.map((ability, index) => (
                <li key={index} style={{ display: 'inline-block', margin: '5px', padding: '5px 15px', backgroundColor: '#007bff', color: 'white', borderRadius: '20px' }}>
                  {ability}
                </li>
              ))}
            </ul>
            <button
              onClick={closeModal}
              style={{
                marginTop: '20px',
                padding: '10px 25px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <footer style={{ textAlign: 'center', marginTop: '40px', padding: '20px', color: '#999' }}>
        Pokémon and Pokémon character names are trademarks of Nintendo.
      </footer>
    </div>
  )
}

export default App