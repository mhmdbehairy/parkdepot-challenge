import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: '',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = slice.actions;

export const selectUser = (state: any) => state.auth.user;
export const selectToken = (state: any) => state.auth.token;

export default slice.reducer;
