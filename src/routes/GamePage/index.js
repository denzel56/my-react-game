import { useState, useEffect } from "react";
import { database } from "../../service/firebase";
import { get, child, ref, set } from "firebase/database";
// import POKEMONS from '../../data/pokemons.json';

import PokemonCards from "../../components/PokemonCards";

import s from './style.module.css';

const GamePage = (isActiveId) => {
  const [pokemons, setPokemonsAtive] = useState({})

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `pokemons`)).then((snapshot) => {
      if (snapshot.exists()) {
        setPokemonsAtive(snapshot.val());
        console.log('#### data', snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [])

  const handleClick = (isActiveId) => {
    setPokemonsAtive(prevState => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (pokemon.id === isActiveId) {
          pokemon.active = true;
        };
        console.log('### id click', isActiveId);
        acc[item[0]] = pokemon;

        return acc;
      }, {});
    })
  }
  return (
    <>
      <div className={s.flex}>
        {
          Object.entries(pokemons).map(([key, {name, img, id, type, values, active}]) => <PokemonCards
            key={key}
            name={name}
            img={img}
            id={id}
            type={type}
            values={values}
            isActive = {active}
            onClickCard={handleClick}
          />)
        }
      </div>
    </>
  );
};

export default GamePage;
