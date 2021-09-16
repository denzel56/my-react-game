import { useState } from "react";
import POKEMONS from '../../data/pokemons.json';

import PokemonCards from "../../components/PokemonCards";

import s from './style.module.css';

const GamePage = (isActiveId) => {
  const [pokemons, setPokemonsAtive] = useState(POKEMONS)

  const handleClick = (isActiveId) => {
    setPokemonsAtive(prevState => {
      prevState.map((item) => {
        if (item.id === isActiveId && item.active !== true) {
          item.active = true
        } else if (item.id === isActiveId && item.active === true) {
          item.active = false
        }

      })
      return [...prevState];
    })
  }
  return (
    <>
      <div className={s.flex}>
        {
          pokemons.map((item) => <PokemonCards
            key={item.id}
            name={item.name}
            img={item.img}
            id={item.id}
            type={item.type}
            values={item.values}
            isActive = {item.active}
            onClickCard={handleClick}
          />)
        }
      </div>
    </>
  );
};

export default GamePage;
