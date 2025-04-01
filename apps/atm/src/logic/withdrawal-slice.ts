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

      // Convert available bills into a dictionary for easy lookup
      let limits = availableBills.reduce((acc, bill) => {
        acc[bill.denomination] = bill.quantity;
        return acc;
      }, {} as { [key: number]: number });

      // Helper recursive function to try withdrawing the amount
      let getMoney = (amount: number, nominals: number[]): any => {
        if (amount === 0) return {}; // Success, no remaining amount
        if (nominals.length === 0) return null; // Failure, no bills left to try

        let nominal = nominals[0]; // Take the largest available denomination
        let count = Math.min(limits[nominal], Math.floor(amount / nominal));

        // Try all possible counts for the current denomination from highest to 0
        for (let i = count; i >= 0; i--) {
          // Recursively try to subtract from the remaining amount
          let result = getMoney(amount - i * nominal, nominals.slice(1));

          // If a valid result is found, return the current bill denomination with count i
          if (result !== null) {
            if (i > 0) {
              return { [nominal]: i, ...result };
            } else {
              return result;
            }
          }
        }

        return null; // No valid result found
      };

      // Get the bills sorted by denomination in descending order
      let result = getMoney(
        remainingAmount,
        Object.keys(limits)
          .map(Number)
          .sort((a, b) => b - a)
      );

      if (result !== null) {
        billsGiven = Object.keys(result).map((denomination) => ({
          denomination: Number(denomination),
          quantity: result[denomination],
        }));

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
