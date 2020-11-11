import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = slice.actions;

export const selectUser = (state: any) => state.auth.user;

export default slice.reducer;
