import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import PokemonCards from '../../../../components/PokemonCards';
import PlayerBoard from './component/PlayerBoard';

import { useDispatch, useSelector } from 'react-redux';
import { selectedPokemonsData } from '../../../../store/selectedPokemons';
import { fetchPokemonsResolvePlayer2 } from '../../../../store/player2Pokemons';

import { player1Win, player2Win, noWinner } from '../../../../store/gameResult';

import request from '../../../../service/request';
import returnBoard from './utils/returnBoard';

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
  // const reduxStore = useStore();
  // const store = reduxStore.getState();
  const selectedPokemonsRedux = useSelector(selectedPokemonsData);
  // const player2Redux = useSelector(selectPokemonsPlayer2Data);
  const dispatch = useDispatch();
  const history = useHistory();

  if (Object.keys(selectedPokemonsRedux).length === 0) {
    history.replace('/game');
  }

  const [startSide, setStartSide] = useState(null);
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
  const [serverBoard, setServerBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);



  // useEffect(() => {
  //   dispatch(getPlayer2PokemonsAsync());
  // }, [dispatch])

  useEffect(() => {

    async function fetchPokemonsP2() {

      const boardRequest = await request.getBoard();
      setBoard(boardRequest.data);

      const player2Request = await request.gameStart({
        pokemons: Object.values(selectedPokemonsRedux)
      })

      setTimeout(() => {
        setStartSide(1);
      }, 2000)

      dispatch(fetchPokemonsResolvePlayer2(player2Request.data));

      setPlayer2(() => player2Request.data.map((item) => ({
        ...item,
        possession: 'red',
      }))
      );

    }

    fetchPokemonsP2();


  }, [])

  const handleClickBoardPlate = async (position) => {

    if (typeof choiseCard === 'object') {
      const params = {
        currentPlayer: 'p1',
        hands: {
          p1: player1,
          p2: player2,
        },
        move: {
          poke: {
            ...choiseCard,
          },
          position,
        },
        board: serverBoard,
      };

      // const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(params),
      // });

      // const request = await res.json();

      if (choiseCard.player === 1) {
        setPlayer1(prevState => prevState.filter(item => item.id !== choiseCard.id));
      }

      // if (choiseCard.player === 2) {
      //   setPlayer2(prevState => prevState.filter(item => item.id !== choiseCard.id));
      // }

      setBoard(prevState => prevState.map(item => {
        if (item.position === position) {
          return {
            ...item,
            card: choiseCard,
          }
        }

        return item;
      }));

      const game = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/game', {
        method: 'POST',
        body: JSON.stringify(params)
      }).then(res => res.json());

      setBoard(returnBoard(game.oldBoard));

      setSteps(prevState => {
        const count = prevState + 1;
        return count;
      })

      if (game.move !== null) {
        const idAi = game.move.poke.id;

        setTimeout(() => {
          setPlayer2(prevState => prevState.map(item => {
            if (item.id === idAi) {
              return item = {
                ...item,
                selected: true,
              }
            }

            return item;
          }));
        }, 1000)


        setTimeout(() => {
          setPlayer2(() => game.hands.p2.pokes.map(item => item.poke));
          setServerBoard(game.board);
          setBoard(returnBoard(game.board));

          setSteps(prevState => {
            const count = prevState + 1;
            return count;
          })

        }, 2000)
      }
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
  }, [steps, board, history, player1, player2, dispatch]);

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
