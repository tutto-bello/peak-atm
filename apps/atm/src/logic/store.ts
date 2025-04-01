import { configureStore } from '@reduxjs/toolkit';
import atmBillsReducer, { AtmBillsState } from './atm-bills-slice';
import withdrawalReducer, { WithdrawalState } from './withdrawal-slice';
import historyReducer, { HistoryState } from './history-slice';

export const store = configureStore({
  reducer: {
    atmBills: atmBillsReducer,
    withdrawal: withdrawalReducer,
    history: historyReducer,
  },
});

export type RootState = {
  atmBills: AtmBillsState;
  withdrawal: WithdrawalState;
  history: HistoryState;
};
export type AppDispatch = typeof store.dispatch;
