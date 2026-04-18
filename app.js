const express = require('express')
const path = require('path')
const app = express()
const pokemon = require('./pokemon.json')

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

// API routes - MUST come BEFORE static files
app.get('/api/pokemon', (req, res) => {
  console.log('Sending all Pokemon')
  res.json(pokemon)
})

app.get('/api/pokemon/:name', (req, res) => {
  const found = pokemon.find(p => p.name === req.params.name)
  if (found) {
    console.log(`Sending ${req.params.name}`)
    res.json(found)
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

// Health check
app.get('/health', (req, res) => {
  console.log('Health check')
  res.send('ok')
})

// Version
app.get('/version', (req, res) => {
  console.log('Version check')
  res.send('28')
})

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')))

// For any other request, serve index.html
app.get('*', (req, res) => {
  console.log('Serving index.html')
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

module.exports = app