import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";

import PokemonCards from "../../../../components/PokemonCards"

import { FireBaseContext } from "../../../../context/firebaseContext";
import { PokemonContext } from "../../../../context/pokemonContext";
import s from "./style.module.css";

const StartPage = () => {
  const firebase = useContext(FireBaseContext);
  const pokemonContext = useContext(PokemonContext);
  const history = useHistory();
  const [pokemons, setPokemons] = useState({})

  useEffect(() => {
    firebase.getPokemonSoket((pokemons) => {
      setPokemons(pokemons);
    })
  }, [])

  const onClickCard = (key) => {
    const pokemon= {...pokemons[key]}

    pokemonContext.onSelected(key, pokemon);
    setPokemons(prevState => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected
      }
    }))
  }

  const handleStartGame = () => {
    history.push('/game/board');
  }

  return (
    <>
      <div className={s.buttonWrap}>
        <button
          onClick={handleStartGame}
          disabled={Object.keys(pokemonContext.pokemons).length < 5}
        >
            Start Game
        </button>
      </div>
      <div className={s.flex}>
        {
          Object.entries(pokemons).map(([key, { name, img, id, type, values, selected }]) =>
            <PokemonCards
              className={s.card}
              key={key}
              name={name}
              img={img}
              id={id}
              type={type}
              values ={values}
              isActive={true}
              isSelected={selected}
              onClickCard={() => {
                if (Object.keys(pokemonContext.pokemons).length < 5 || selected) {
                  onClickCard(key)
                }
              }}
          />)
        }
      </div>
    </>
  );
};

export default StartPage;
