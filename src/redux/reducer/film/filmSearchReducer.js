import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
  data: [],
  searchResult:[],
  isSearch: false,
  payload: '',
};

export const filmSearchSlice = createSlice({
  name: 'filmSearch',
  initialState: { value: initialStateValue },
  reducers: {
    filmSearchReducer: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { filmSearchReducer } = filmSearchSlice.actions;

export default filmSearchSlice.reducer;
