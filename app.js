const express = require('express')
const app = express()
const pokemon = require('./pokemon.json')
const path = require('path')

console.log('Starting server...')
console.log('Pokemon loaded:', pokemon.length)

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')))

// Get all pokemon
app.get('/api/pokemon', (req, res) => {
  console.log('GET /api/pokemon')
  res.json(pokemon)
})

// Get pokemon by name
app.get('/api/pokemon/:name', (req, res) => {
  const name = req.params.name
  console.log('GET /api/pokemon/', name)
  
  const found = pokemon.find(p => p.name === name)
  if (found) {
    res.json(found)
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

// Serve index.html for all other routes
app.get('*', (req, res) => {
  console.log('Serving index.html for:', req.url)
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`📦 API available at http://localhost:${PORT}/api/pokemon`)
})