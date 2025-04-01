import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Bill {
  denomination: number;
  quantity: number;
}

export interface AtmBillsState {
  bills: Bill[];
}

const initialState: AtmBillsState = {
  bills: [
    { denomination: 20000, quantity: 10 },
    { denomination: 10000, quantity: 10 },
    { denomination: 5000, quantity: 10 },
    { denomination: 2000, quantity: 10 },
  ],
};

const atmBillsSlice = createSlice({
  name: 'atmBills',
  initialState,
  reducers: {
    updateBills: (state, action: PayloadAction<Bill[]>) => {
      state.bills = action.payload;
    },
    manipulateBill: (
      state,
      action: PayloadAction<{ denomination: number; change: number }>
    ) => {
      const bill = state.bills.find(
        (b) => b.denomination === action.payload.denomination
      );
      if (bill) {
        bill.quantity += action.payload.change;
      }
    },
  },
});

export const { updateBills, manipulateBill } = atmBillsSlice.actions;
export default atmBillsSlice.reducer;
