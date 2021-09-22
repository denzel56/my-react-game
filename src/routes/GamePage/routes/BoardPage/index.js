import { useState, useEffect, useContext } from 'react';
import PokemonCards from '../../../../components/PokemonCards';
import { PokemonContext } from '../../../../context/pokemonContext';
import s from './style.module.css';

const BoardPage = () => {
  const { pokemons, clearContext } = useContext(PokemonContext);
  const [smallCards, setSmallCards] = useState({});


  useEffect(() => {
    setSmallCards(pokemons);
    clearContext(prevState => prevState = {})
  }, [])

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        {
          Object.values(smallCards).map(({ id, name, img, type, values }) =>
            <PokemonCards
              className={s.card}
              key={id}
              name={name}
              img={img}
              id={id}
              type={type}
              values={values}
              minimize
              isActive
            />
          )
        }
      </div>
      <div className={s.board}>
        <div className={s.boardPlate}>1</div>
        <div className={s.boardPlate}>2</div>
        <div className={s.boardPlate}>3</div>
        <div className={s.boardPlate}>4</div>
        <div className={s.boardPlate}>5</div>
        <div className={s.boardPlate}>6</div>
        <div className={s.boardPlate}>7</div>
        <div className={s.boardPlate}>8</div>
        <div className={s.boardPlate}>9</div>
      </div>
    </div>
  );
};

export default BoardPage;
