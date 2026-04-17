const express = require('express')
const app = express()
const pokemon = require('./pokemon.json')
const path = require('path')

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')))

// API routes
app.get('/api/pokemon', (req, res) => {
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

// All other routes should serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})
// Add this before the existing routes
app.get('/health', (req, res) => {
  res.send('ok')
})
app.get('/version', (req, res) => {
  res.send('1')
})

module.exports = app