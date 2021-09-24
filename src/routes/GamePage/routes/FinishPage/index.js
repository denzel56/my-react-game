import { useContext } from "react";
import { PokemonContext } from "../../../../context/pokemonContext";
import PokemonCards from "../../../../components/PokemonCards";
import cn from "classnames";

import { useHistory } from "react-router";
import { FireBaseContext } from "../../../../context/firebaseContext";
import s from "./style.module.css";
import { useEffect } from "react";

const FinishPage = () => {
  const pokemonContext = useContext(PokemonContext);
  const firebase = useContext(FireBaseContext);

  let takeCard;
  const history = useHistory();

  const handleClickTrophyCard = (card) => {
    takeCard = card;
    console.log('win card', card);
  }
  const handleFinishGame = () => {
    console.log('pokemons', pokemonContext);
    console.log('location start-page');
    console.log('my card', takeCard);
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
              onClick={() => {
                if (pokemonContext.gameResult === 'player1') {
                  handleClickTrophyCard(item);
                }
              }}
              disabled
              key={item.id}>
              <PokemonCards
                name={item.name}
                img={item.img}
                id={item.id}
                type={item.type}
                values={item.values}
                isActive
                isSelected={false}
              />
            </div>)
          )
        }
      </div>
    </>
  )
}

export default FinishPage;
