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

module.exports = app