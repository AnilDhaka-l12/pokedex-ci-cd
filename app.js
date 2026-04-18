const express = require('express')
const app = express()
const pokemon = require('./pokemon.json')
const path = require('path')

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')))

// API routes - MUST come BEFORE the catch-all route
app.get('/api/pokemon', (req, res) => {
  console.log('GET /api/pokemon - returning', pokemon.length, 'pokemon')
  res.json(pokemon)
})

app.get('/api/pokemon/:name', (req, res) => {
  const name = req.params.name
  console.log('GET /api/pokemon/', name)
  const found = pokemon.find(p => p.name === name)
  if (found) {
    res.json(found)
  } else {
    res.status(404).json({ error: 'Pokemon not found' })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('Health check called')
  res.send('ok')
})

// Version endpoint
app.get('/version', (req, res) => {
  console.log('Version check called')
  res.send('27')
})

// IMPORTANT: This catch-all route must be LAST!
app.get('*', (req, res) => {
  console.log('Serving index.html for:', req.url)
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

module.exports = app