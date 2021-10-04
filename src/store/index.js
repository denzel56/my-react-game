import { configureStore } from "@reduxjs/toolkit";
import player2Pokemons from "./player2Pokemons";
import pokemonsReducer from './pokemons';
import selectedPokemonsReducer from "./selectedPokemons";
import gameResult from "./gameResult";
import userReducer from "./user";

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    selectedPokemons: selectedPokemonsReducer,
    player2: player2Pokemons,
    gameResult: gameResult,
    user: userReducer,
  },
})
