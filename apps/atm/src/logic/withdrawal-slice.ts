import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WithdrawalState {
  amount: number;
  success: boolean;
  error: string | null;
  billsGiven: { denomination: number; quantity: number }[];
}

const initialState: WithdrawalState = {
  amount: 0,
  success: false,
  error: null,
  billsGiven: [],
};

const withdrawalSlice = createSlice({
  name: 'withdrawal',
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    processWithdrawal: (
      state,
      action: PayloadAction<{
        amount: number;
        availableBills: { denomination: number; quantity: number }[];
      }>
    ) => {
      const { amount, availableBills } = action.payload;
      let remainingAmount = amount;
      let billsGiven: { denomination: number; quantity: number }[] = [];

      // Sort bills by denomination (largest first)
      const sortedBills = [...availableBills].sort(
        (a, b) => b.denomination - a.denomination
      );

      for (let bill of sortedBills) {
        if (remainingAmount >= bill.denomination && bill.quantity > 0) {
          const neededBills = Math.min(
            Math.floor(remainingAmount / bill.denomination),
            bill.quantity
          );
          billsGiven.push({
            denomination: bill.denomination,
            quantity: neededBills,
          });
          remainingAmount -= neededBills * bill.denomination;
        }
      }

      if (remainingAmount === 0) {
        state.success = true;
        state.billsGiven = billsGiven;
        state.error = null;
      } else {
        state.success = false;
        state.billsGiven = [];
        state.error = 'Insufficient bills to complete the transaction.';
      }
    },
    reset: (state) => {
      state.amount = 0;
      state.success = false;
      state.error = null;
      state.billsGiven = [];
    },
  },
});

export const { setAmount, processWithdrawal, reset } = withdrawalSlice.actions;
export default withdrawalSlice.reducer;
