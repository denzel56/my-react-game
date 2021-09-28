import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter';
import player2Pokemons from "./player2Pokemons";
import pokemonsReducer from './pokemons';
import selectedPokemonsReducer from "./selectedPokemons";

export default configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsReducer,
    selectedPokemons: selectedPokemonsReducer,
    player2: player2Pokemons,
  },
})
