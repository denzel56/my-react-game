import { useState, useEffect } from "react";
import { database } from "../../service/firebase";
import { get, child, ref, set, update, push } from "firebase/database";
import POKEMONS from '../../data/pokemons.json';

import PokemonCards from "../../components/PokemonCards";

import s from './style.module.css';

const GamePage = (objKey) => {
  const [pokemons, setPokemonsActive] = useState({})
  const dbRef = ref(database);

  const getPokemons = () => {
    get(child(dbRef, `pokemons`)).then((snapshot) => {
      if (snapshot.exists()) {
        setPokemonsActive(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  useEffect(() => {
    getPokemons();
  }, [])

  const handleAddPokemon = () => {
    const getRandomPokemon = (num) => Math.ceil(Math.random() * num);
    const newPokemonKey = push(child(dbRef, 'pokemons')).key;

    set(ref(database, `pokemons/${newPokemonKey}`),
      POKEMONS[getRandomPokemon((POKEMONS.length) - 1)]
    ).then(() => {
      getPokemons();
    });

  }

  const handleClick = (objKey) => {

    setPokemonsActive(prevState => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };

        if (item[0] === objKey) {
          pokemon.active = !pokemon.active;
          update(dbRef, {
            [`pokemons/${objKey}`]: {
            ...pokemon,
            active: false
          }})
        };
        acc[item[0]] = pokemon;
        return acc;
      }, {});

    })
  }

  return (
    <>
      <button onClick={handleAddPokemon}>
          Add Pokemon
      </button>
      <div className={s.flex}>
        {
          Object.entries(pokemons).map(([key, {name, img, id, type, values, active}]) => <PokemonCards
            key={key}
            name={name}
            img={img}
            id={id}
            type={type}
            values ={values}
            isActive = {active}
            onClickCard={handleClick}
            objKey = {key}
          />)
        }
      </div>
    </>
  );
};

export default GamePage;
