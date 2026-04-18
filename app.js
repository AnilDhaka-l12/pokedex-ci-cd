const express = require('express');
const path = require('path');
const app = express();
const pokemon = require('./pokemon.json');

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/api/pokemon', (req, res) => {
  res.json(pokemon);
});

app.get('/api/pokemon/:name', (req, res) => {
  const found = pokemon.find(p => p.name === req.params.name);
  if (found) {
    res.json(found);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.get('/health', (req, res) => {
  res.send('ok');
});

app.get('/version', (req, res) => {
  res.send('28');
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = app;