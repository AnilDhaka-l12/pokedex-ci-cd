import React from 'react';
import { Link } from 'react-router-dom';

const PokemonList = ({ pokemonList }) => {
  if (!pokemonList || pokemonList.length === 0) {
    return <div>Loading Pokémon...</div>;
  }

  return (
    <div className="list-container">
      {pokemonList.map((pokemon) => {
        const id = pokemon.url.split('/')[6];
        const name = pokemon.name;
        
        return (
          <Link 
            key={id} 
            to={`/pokemon/${name}`} 
            className="list-item" 
            style={{ backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png)` }}
          >
            <div className="list-item-name">
              {name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PokemonList;