const express = require('express')
const path = require('path')
const app = express()

// Complete Pokemon data with images - load from pokemon.json
const pokemon = require('./pokemon.json')

console.log(`Loaded ${pokemon.length} Pokemon with images`)

// API ROUTES - MUST COME FIRST
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

// STATIC FILES - AFTER API ROUTES
app.use(express.static(path.join(__dirname, 'dist')))

// CATCH ALL - MUST BE LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

module.exports = app