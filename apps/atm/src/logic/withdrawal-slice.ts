import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

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

export const processWithdrawal = createAsyncThunk<
  {
    success: boolean;
    billsGiven: { denomination: number; quantity: number }[];
  },
  {
    amount: number;
    availableBills: { denomination: number; quantity: number }[];
  },
  { rejectValue: string }
>(
  'withdrawal/processWithdrawal',
  async ({ amount, availableBills }, { rejectWithValue }) => {
    let remainingAmount = amount;
    let billsGiven: { denomination: number; quantity: number }[] = [];

    let limits = availableBills.reduce((acc, bill) => {
      acc[bill.denomination] = bill.quantity;
      return acc;
    }, {} as { [key: number]: number });

    let getMoney = (amount: number, nominals: number[]): any => {
      if (amount === 0) return {};
      if (nominals.length === 0) return null;

      let nominal = nominals[0];
      let count = Math.min(limits[nominal], Math.floor(amount / nominal));

      for (let i = count; i >= 0; i--) {
        let result = getMoney(amount - i * nominal, nominals.slice(1));

        if (result !== null) {
          if (i > 0) {
            return { [nominal]: i, ...result };
          } else {
            return result;
          }
        }
      }

      return null;
    };

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

      return { success: true, billsGiven };
    } else {
      return rejectWithValue('Insufficient bills to complete the transaction.');
    }
  }
);

const withdrawalSlice = createSlice({
  name: 'withdrawal',
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    reset: (state) => {
      state.amount = 0;
      state.success = false;
      state.error = null;
      state.billsGiven = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(processWithdrawal.fulfilled, (state, action) => {
        state.success = true;
        state.billsGiven = action.payload.billsGiven;
        state.error = null;
      })
      .addCase(processWithdrawal.rejected, (state, action) => {
        state.success = false;
        state.billsGiven = [];
        state.error = action.payload || 'Withdrawal failed';
      });
  },
});

export const { setAmount, reset } = withdrawalSlice.actions;
export default withdrawalSlice.reducer;
