import { useEffect, useState } from "react";
import PokemonCards from "../../../../components/PokemonCards";
import cn from "classnames";

import { useHistory } from "react-router";

import { useSelector } from "react-redux";
import { selectedPokemonsData } from "../../../../store/selectedPokemons";
import { selectPokemonsPlayer2Data } from "../../../../store/player2Pokemons";
import { resultData } from "../../../../store/gameResult";

import s from "./style.module.css";
import FirebaseClass from "../../../../service/firebase";

const FinishPage = () => {
  const selectedPokemonsRedux = useSelector(selectedPokemonsData);
  const player2Redux = useSelector(selectPokemonsPlayer2Data);
  const winnerRedux = useSelector(resultData);

  const [player2, setPlayer2] = useState([]);
  const [giftCard, setGiftCard] = useState(null);

  const history = useHistory();

  if (Object.keys(player2Redux).length === 0) {
    history.replace('/game');
  }

  useEffect(() => {
    setPlayer2(player2Redux);
  }, []);



  const handleClickTrophyCard = (card) => {

    setGiftCard(card);

    setPlayer2(player2.reduce((acc, item) => {
      if (item.id === card.id) {
        item = {
          ...item,
          isSelected: !item.isSelected,
        }
      } else {
        item = {
          ...item,
          isSelected: false,
        }
      }
      acc.push(item);
      return acc;
      }, []))
  }

  const handleFinishGame = () => {
    if (giftCard) {
      setGiftCard({
        ...giftCard,
        isSelected: false,
      })
      FirebaseClass.addPokemon(giftCard);
    }

    history.replace('/game');
  }
  return (
    <>
          <div className={s.cardCont} >
            {
              Object.values(selectedPokemonsRedux).map((item) => (

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
        <button
          onClick={handleFinishGame}
          disabled={giftCard === null && winnerRedux === 'player1'}
        >
            End Game
        </button>
      </div>

      <div className={s.cardCont}>
        {
          player2.map((item) => (
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
                  if (winnerRedux === 'player1') {
                    handleClickTrophyCard(item)
                  }
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
