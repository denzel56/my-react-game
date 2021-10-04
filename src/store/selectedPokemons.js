import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'selectedPokemons',
  initialState: {
    isPokemon: false,
    data: {},
  },
  reducers: {
    addPokemon: (state, actions) => ({
      ...state,
      data: actions.payload,
    }),

    cleanPokemons: () => ({
      data: {}
    }),
  },
});

export const { addPokemon, delPokemon, cleanPokemons } = slice.actions;

export const selectedPokemonsData = state => state.selectedPokemons.data;

export default slice.reducer;
