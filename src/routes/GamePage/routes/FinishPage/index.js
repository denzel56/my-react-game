import { useContext } from "react";
import { PokemonContext } from "../../../../context/pokemonContext";
import PokemonCards from "../../../../components/PokemonCards";
import cn from "classnames";

import { useHistory, useLocation } from "react-router";
import { FireBaseContext } from "../../../../context/firebaseContext";
import s from "./style.module.css";

const FinishPage = () => {
  const pokemonContext = useContext(PokemonContext);
  const firebase = useContext(FireBaseContext);

  const history = useHistory();
  let takeCard = null;

  if (Object.keys(pokemonContext.pokemonsP2).length === 0) {
    history.replace('/game');
  }

  const handleClickTrophyCard = (card) => {
    takeCard = card;

    pokemonContext.setPokemonsP2(pokemonContext.pokemonsP2.reduce((acc, item) => {
      if (item.id === card.id) {
        item.isSelected = !item.isSelected;
      }
      acc.push(item);
      return acc;
      }, []))
    console.log('p2', pokemonContext.pokemonsP2);
  }
  const handleFinishGame = () => {
    // console.log('pokemonsP2', pokemonContext.pokemonsP);
    console.log('location start-page');
    // console.log('my card', takeCard);
    if(takeCard) {
      firebase.addPokemon(takeCard);
    }
    pokemonContext.clearContext();
    history.replace('/game');
  }
  return (
    <>
          <div className={s.cardCont} >
            {
              Object.values(pokemonContext.pokemons).map((item) => (

              <div className={s.card} key={item.id}>
                <PokemonCards
                  name={item.name}
                  img={item.img}
                  id={item.id}
                  type={item.type}
                  values={item.values}
                  isActive
                />
              </div>)
            )
            }
      </div>

      <div className={s.buttonWrap}>
        <button onClick={handleFinishGame} >
            End Game
        </button>
      </div>

      <div className={s.cardCont}>
        {
          pokemonContext.pokemonsP2.map((item) => (
            <div className={cn(s.card, s.pokemonCard)}

              key={item.id}>
              <PokemonCards
                name={item.name}
                img={item.img}
                id={item.id}
                type={item.type}
                values={item.values}
                isActive
                onClickCard={() => {
                  handleClickTrophyCard(item)
                }}
                isSelected={item.isSelected}
              />
            </div>)
          )
        }
      </div>
    </>
  )
}

export default FinishPage;
