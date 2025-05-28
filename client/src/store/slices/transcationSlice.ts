import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: string;
  movieId: string;
  seatsBooked: number;
  timestamp: string;
}

interface TransactionState {
  list: Transaction[];
}

const initialState: TransactionState = {
  list: [],
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.list.push(action.payload);
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.list = action.payload;
    },
  },
});

export const { addTransaction, setTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
