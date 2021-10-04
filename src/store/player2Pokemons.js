import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'player2Pokemons',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  reducers: {
    fetchPokemonsPlayer2: state => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonsResolvePlayer2: (state, actions) => ({
      ...state,
      isLoading: false,
      data: actions.payload,
    }),
    fetchPokemonsRejectPlayer2: (state, actions) => ({
      ...state,
      isLoading: false,
      data: {},
      error: actions.payload,
    }),
  },
});

export const { fetchPokemonsPlayer2, fetchPokemonsResolvePlayer2, fetchPokemonsRejectPlayer2 } = slice.actions;

export const selectPokemonsPlayer2Loading = state => state.player2.isLoading;
export const selectPokemonsPlayer2Data = state => state.player2.data;

export const getPlayer2PokemonsAsync = () => async (dispatch) => {
  // dispatch(fetchPokemonsPlayer2());
  const data = await fetch('https://reactmarathon-api.netlify.app/api/create-player').then(res => res.json());
  dispatch(fetchPokemonsResolvePlayer2(data.data));
}

export default slice.reducer;
