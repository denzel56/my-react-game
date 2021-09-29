import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import PokemonCards from "../../../../components/PokemonCards"

import { useDispatch, useSelector } from "react-redux";
import { getPokemonsAsync, selectPokemonsData } from "../../../../store/pokemons";
import { selectedPokemonsData, addPokemon, cleanPokemons } from "../../../../store/selectedPokemons";

import s from "./style.module.css";
import { cleanPokemonsPlayer2 } from "../../../../store/player2Pokemons";

const StartPage = () => {
  const pokemonsRedux = useSelector(selectPokemonsData);
  const selectedPokemonsRedux = useSelector(selectedPokemonsData);
  const dispatch = useDispatch();
  const history = useHistory();

  const [pokemons, setPokemons] = useState({})


  useEffect(() => {
    dispatch(cleanPokemonsPlayer2());
    dispatch(cleanPokemons());
    dispatch(getPokemonsAsync());
  }, [dispatch])

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);

  const onClickCard = (key) => {

    const pokemon = { ...pokemons[key] }

      setPokemons(prevState => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          selected: !prevState[key].selected
        }
      }))

      dispatch(addPokemon({
        ...selectedPokemonsRedux,
        [key]: pokemon,
      }));
  }

  const handleStartGame = () => {
    history.push('/game/board');
  }

  return (
    <>
      <div className={s.buttonWrap}>
        <button
          onClick={handleStartGame}
          disabled={Object.keys(selectedPokemonsRedux).length < 5}
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
                if (Object.keys(selectedPokemonsRedux).length < 5 || selected) {
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
