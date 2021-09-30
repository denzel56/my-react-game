import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import PokemonCards from '../../../../components/PokemonCards';
import PlayerBoard from './component/PlayerBoard';

import { useDispatch, useSelector } from 'react-redux';
import { selectedPokemonsData } from '../../../../store/selectedPokemons';
import { getPlayer2PokemonsAsync, selectPokemonsPlayer2Data } from '../../../../store/player2Pokemons';

import { player1Win, player2Win, noWinner } from '../../../../store/gameResult';
import s from './style.module.css';

const counterWin = (board, player1, player2) => {
  let player1Count = player1.length;
  let player2Count = player2.length;

  board.forEach(item => {
    if (item.card.possession === 'blue') {
      player1Count++;
    }

    if (item.card.possession === 'red') {
      player2Count++;
    }
  });

  return [player1Count, player2Count];
}

const BoardPage = () => {
  const selectedPokemonsRedux = useSelector(selectedPokemonsData);
  const player2Redux = useSelector(selectPokemonsPlayer2Data);
  const dispatch = useDispatch();

  const [board, setBoard] = useState([]);
  const [player1, setPlayer1] = useState(() => {
    return Object.values(selectedPokemonsRedux).map((item) => ({
      ...item,
      possession: 'blue',
    }))
  });
  const [player2, setPlayer2] = useState([]);
  const [choiseCard, setChoiseCard] = useState(null);
  const [steps, setSteps] = useState(0);

  const history = useHistory();


  useEffect(() => {
    dispatch(getPlayer2PokemonsAsync());
  }, [dispatch])


  useEffect(() => {

    async function fetchPokemonsP2() {
      const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
      const boardRequest = await boardResponse.json();
      setBoard(boardRequest.data);
    }

    fetchPokemonsP2();
    setPlayer2(() => {
      return player2Redux.map((item) => ({
        ...item,
        possession: 'red',
      }));
    });
  }, [player2Redux])

  if (Object.keys(selectedPokemonsRedux).length === 0) {
    history.replace('/game');
  }
  const handleClickBoardPlate = async (position) => {

    if (choiseCard) {
      const params = {
        position,
        card: choiseCard,
        board,
      };

      const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const request = await res.json();

      if (choiseCard.player === 1) {
        setPlayer1(prevState => prevState.filter(item => item.id !== choiseCard.id))
      }

      if (choiseCard.player === 2) {
        setPlayer2(prevState => prevState.filter(item => item.id !== choiseCard.id))
      }

      setBoard(request.data)
      setSteps(prevState => {
        const count = prevState + 1;
        return count;
      })
    }
  }

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);

      if (count1 > count2) {
        dispatch(player1Win());
        alert('Win');
      } else if (count1 < count2) {
        dispatch(player2Win());
        alert('Lose');
      } else {
        dispatch(noWinner());
        alert('Draw');
      }
      history.push('/game/finish')
    }
  }, [steps, board, history, player1, player2, dispatch])
  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        {
          <PlayerBoard
            player={1}
            cards={player1}
            onClickCard={(card) => setChoiseCard(card)}
          />
        }
      </div>
      <div className={s.playerTwo} >
        <PlayerBoard
          player={2}
          cards={player2}
          onClickCard={(card) => setChoiseCard(card)}
        />
      </div>
      <div className={s.board}>
        {
          board.map(item => (
            <div
              key={item.position}
              className={s.boardPlate}
              onClick={() => !item.card && handleClickBoardPlate(item.position)}
            >
              {
                item.card && <PokemonCards {...item.card} isActive minimize />
              }
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default BoardPage;
