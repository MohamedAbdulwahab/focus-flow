import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  remainingTime: parseInt(localStorage.getItem('remainingTime')) || 60 * 25,
  isRunning: false,
  isCompleted: false, // New state property to track whether the timer has completed
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    decrementTime: (state) => {
      if (!state.isCompleted && state.remainingTime > 0 && state.isRunning) {
        state.remainingTime -= 1;
        if (state.remainingTime === 0) {
          state.isCompleted = true;
          clearInterval(state.timerInterval); // Clear the interval when the timer completes
        }
        localStorage.setItem('remainingTime', state.remainingTime);
      }
    },
    resetTimer: (state) => {
      state.remainingTime = 60 * 25;
      state.isCompleted = false; // Reset the isCompleted flag when resetting the timer
      localStorage.setItem('remainingTime', state.remainingTime);
    },
    setRunningStatus: (state, action) => {
      state.isRunning = action.payload;
    },
    setTimerInterval: (state, action) => {
      state.timerInterval = action.payload; // Store the timer interval ID in state
    },
  },
});

export const { decrementTime, resetTimer, setRunningStatus, setTimerInterval } =
  timerSlice.actions;
export default timerSlice.reducer;
