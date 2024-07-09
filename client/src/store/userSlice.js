import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'user',
  user: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = 'user login';
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = [];
      localStorage.clear();
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { login, logout, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;