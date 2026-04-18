const express = require('express')
const path = require('path')
const app = express()

// Pokemon data directly in file
const pokemon = [
  { 'id': 1, 'name': 'bulbasaur', 'type': ['grass', 'poison'], 'abilities': ['overgrow'] },
  { 'id': 2, 'name': 'ivysaur', 'type': ['grass', 'poison'], 'abilities': ['overgrow'] },
  { 'id': 3, 'name': 'venusaur', 'type': ['grass', 'poison'], 'abilities': ['overgrow'] },
  { 'id': 4, 'name': 'charmander', 'type': ['fire'], 'abilities': ['blaze'] },
  { 'id': 5, 'name': 'charmeleon', 'type': ['fire'], 'abilities': ['blaze'] },
  { 'id': 6, 'name': 'charizard', 'type': ['fire', 'flying'], 'abilities': ['blaze'] },
  { 'id': 7, 'name': 'squirtle', 'type': ['water'], 'abilities': ['torrent'] },
  { 'id': 8, 'name': 'wartortle', 'type': ['water'], 'abilities': ['torrent'] },
  { 'id': 9, 'name': 'blastoise', 'type': ['water'], 'abilities': ['torrent'] },
  { 'id': 25, 'name': 'pikachu', 'type': ['electric'], 'abilities': ['static'] },
  { 'id': 133, 'name': 'eevee', 'type': ['normal'], 'abilities': ['run-away', 'adaptability'] },
  { 'id': 150, 'name': 'mewtwo', 'type': ['psychic'], 'abilities': ['pressure'] },
  { 'id': 151, 'name': 'mew', 'type': ['psychic'], 'abilities': ['synchronize'] }
]

console.log(`Loaded ${pokemon.length} Pokemon`)

// Test endpoints
app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint works!', time: new Date().toISOString() })
})

app.get('/api/test', (req, res) => {
  res.json({ message: 'API test endpoint works!' })
})

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')))

// API routes
app.get('/api/pokemon', (req, res) => {
  console.log('GET /api/pokemon')
  res.json(pokemon)
})

app.get('/api/pokemon/:name', (req, res) => {
  const name = req.params.name
  const found = pokemon.find(p => p.name === name)
  if (found) {
    res.json(found)
  } else {
    res.status(404).json({ error: 'Pokemon not found' })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.send('ok')
})

// Version
app.get('/version', (req, res) => {
  res.send('28')
})

// Catch-all route - serve index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

module.exports = app