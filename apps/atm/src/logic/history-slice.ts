import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WithdrawalHistory } from '@peak/shared-types';

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
