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

// =============================================
// API ROUTES - MUST COME FIRST
// =============================================
app.get('/api/pokemon', (req, res) => {
  console.log('GET /api/pokemon')
  res.json(pokemon)
})

app.get('/api/pokemon/:name', (req, res) => {
  const found = pokemon.find(p => p.name === req.params.name)
  if (found) {
    res.json(found)
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

// Health check (required by exercise)
app.get('/health', (req, res) => {
  console.log('GET /health')
  res.send('ok')
})

// Version endpoint
app.get('/version', (req, res) => {
  console.log('GET /version')
  res.send('28')
})

// =============================================
// STATIC FILES - AFTER API ROUTES
// =============================================
app.use(express.static(path.join(__dirname, 'dist')))

// =============================================
// CATCH ALL - MUST BE LAST
// =============================================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

module.exports = app