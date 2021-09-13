import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import Layout from './components/Layout';
import PokemonCards from './components/PokemonCards';
import bg1 from './assets/bg1.jpg';
import bg3 from './assets/bg3.jpg';
import POKEMONS from './data/pokemons.json';

import s from './style.module.css';

function App() {
  const title = 'This is title';
  const descr = 'This is Description!'
  return (
    <>
      <Header
        title = {title}
        descr = {descr}
      />
      <Layout
        title = {title}
        urlBg = {bg1}
      >
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
          Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.
        </p>
        <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead.
        </p>
      </Layout>
      <Layout
        title = {title}
        colorBg = '#30d5c8'
      >
        <div className={s.flex}>
          {
						POKEMONS.map((item) => <PokemonCards
							key={item.id}
							name={item.name}
							img={item.img}
							id={item.id}
							type={item.type}
							values={item.values}
						/>)
          }
        </div>
      </Layout>
      <Layout
        title = {title}

        urlBg = {bg3}
      >
        <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead.
        </p>
      </Layout>
      <Footer/>
    </>
  );
}

export default App;
