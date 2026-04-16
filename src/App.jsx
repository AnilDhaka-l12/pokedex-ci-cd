import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PokemonList from './PokemonList'
import PokemonPage from './PokemonPage'

const App = () => {
  return (
    <div className="app">
      <h1>Pokédex</h1>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonPage />} />
      </Routes>
    </div>
  )
}

export default App