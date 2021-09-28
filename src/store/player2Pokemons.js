import { createSlice } from "@reduxjs/toolkit";
// import FirebaseClass from "../service/firebase";

export const slice = createSlice({
  name: 'player2Pokemons',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
  },
  reducers: {
    fetchPokemonsPlayer2: state => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonsRejectPlayer2: (state, actions) => ({
      ...state,
      isLoading: false,
      data: actions.payload,
    }),
    fetchPokemonsRejectPlayer2: (state, actions) => ({
      ...state,
      isLoading: false,
      data: {},
      error: actions.payload,
    })
  },
});

export const { fetchPokemonsPlayer2, fetchPokemonsResolvePlayer2, fetchPokemonsRejectPlayer2 } = slice.actions;

export const selectPokemonsPlayer2Loading = state => state.pokemons.isLoading;
export const selectPokemonsPlayer2Data = state => state.pokemons.data;

export const getPlayer2PokemonsAsync = () => async (dispatch) => {
  dispatch(fetchPokemonsPlayer2());
  const data = await fetch('https://reactmarathon-api.netlify.app/api/create-player').then(res => res.json());
  dispatch(fetchPokemonsResolvePlayer2(data));
}

export default slice.reducer;
