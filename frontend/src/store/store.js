import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlices/apiSlice';
import authSliceReducer from './slices/authSlice';
import timerSliceReducer from './slices/timerSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    timer: timerSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
