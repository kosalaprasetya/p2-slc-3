import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import http from '../../../helpers/http';
import Swal from 'sweetalert2';

const initialState = {
  data: [],
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.data = action.payload;
    },
    removeGame: (state, action) => {
      state.data = state.data.filter((station) => station.id !== action.payload);
    },
  },
});

export const fetchGames = createAsyncThunk('games/fetchGames', async (_, { dispatch }) => {
  try {
    const response = await http({
      method: 'GET',
      url: '/games',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    const data = response.data.map((el) => {
      const newDate = new Date(el.releaseDate);
      el.releaseDate = newDate.toISOString().split('T')[0];
      return el;
    });
    dispatch(setGames(data));
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.message,
    });
  }
});

export const deleteGame = createAsyncThunk('games/deleteGame', async (gameId, { dispatch }) => {
  try {
    await http({
      method: 'DELETE',
      url: `/games/${gameId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    dispatch(removeGame(gameId));
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.response.data.message,
    });
  }
});

export const { setGames, removeGame } = gamesSlice.actions;
export default gamesSlice.reducer;
