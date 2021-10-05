import { createSlice } from "@reduxjs/toolkit";
// import FirebaseClass from "../service/firebase";
import { selectUserLocalId } from "./user";

export const slice = createSlice({
  name: 'pokemons',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
  },
  reducers: {
    fetchPokemons: state => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonsResolve: (state, actions) => ({
      ...state,
      isLoading: false,
      data: actions.payload,
    }),
    fetchPokemonsReject: (state, actions) => ({
      ...state,
      isLoading: false,
      data: {},
      error: actions.payload,
    })
  },
});

export const { fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject } = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;

export const getPokemonsAsync = () => async (dispatch, getState) => {
  const localId = selectUserLocalId(getState());
  dispatch(fetchPokemons());

  const data = await fetch(`https://pokemon-game-react-default-rtdb.europe-west1.firebasedatabase.app/${localId}/pokemons.json`).then(res => res.json());

  dispatch(fetchPokemonsResolve(data));
}

export default slice.reducer;
