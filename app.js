const express = require('express')
const path = require('path')
const app = express()

// Pokemon data
const pokemon = [
  { id: 1, name: 'bulbasaur', type: ['grass', 'poison'], abilities: ['overgrow'] },
  { id: 2, name: 'ivysaur', type: ['grass', 'poison'], abilities: ['overgrow'] },
  { id: 3, name: 'venusaur', type: ['grass', 'poison'], abilities: ['overgrow'] },
  { id: 4, name: 'charmander', type: ['fire'], abilities: ['blaze'] },
  { id: 5, name: 'charmeleon', type: ['fire'], abilities: ['blaze'] },
  { id: 6, name: 'charizard', type: ['fire', 'flying'], abilities: ['blaze'] },
  { id: 7, name: 'squirtle', type: ['water'], abilities: ['torrent'] },
  { id: 25, name: 'pikachu', type: ['electric'], abilities: ['static'] },
  { id: 133, name: 'eevee', type: ['normal'], abilities: ['run-away', 'adaptability'] },
  { id: 150, name: 'mewtwo', type: ['psychic'], abilities: ['pressure'] },
  { id: 151, name: 'mew', type: ['psychic'], abilities: ['synchronize'] }
]

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')))

// API routes
app.get('/api/pokemon', (req, res) => {
  res.json(pokemon)
})

app.get('/api/pokemon/:name', (req, res) => {
  const found = pokemon.find(p => p.name === req.params.name)
  found ? res.json(found) : res.status(404).json({ error: 'Not found' })
})

// Health check (required by exercise)
app.get('/health', (req, res) => {
  res.send('ok')
})

// Version endpoint
app.get('/version', (req, res) => {
  res.send('1.0.0')
})

// Catch all - serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

module.exports = app