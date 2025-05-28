import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import userReducer from './slices/userSlice';
import transactionReducer from './slices/transcationSlice';
import stepReducer from'./slices/stepSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    users: userReducer,
    transactions: transactionReducer,
    step: stepReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
