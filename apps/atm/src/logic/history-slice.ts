import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WithdrawalHistory {
  timestamp: string;
  amount: number;
  success: boolean;
  billsGiven: { denomination: number; quantity: number }[];
}

export interface HistoryState {
  history: WithdrawalHistory[];
}

const initialState: HistoryState = {
  history: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<WithdrawalHistory>) => {
      state.history.unshift(action.payload);
    },
  },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
