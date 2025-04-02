export function sharedTypes(): string {
  return 'shared-types';
}

export interface Bill {
  denomination: number;
  quantity: number;
}

export interface WithdrawalHistory {
  timestamp: string;
  amount: number;
  success: boolean;
  billsGiven: { denomination: number; quantity: number }[];
}

export interface WithdrawalState {
  amount: number;
  success: boolean;
  error: string | null;
  billsGiven: { denomination: number; quantity: number }[];
}
