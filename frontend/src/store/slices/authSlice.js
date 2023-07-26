import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
