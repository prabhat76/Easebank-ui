import { createAction, props } from '@ngrx/store';

// Updated to match Spring Boot Account entity
export interface Account {
  accountId: number;    // Match backend response field
  accountNumber: string;
  accountType: string;
  balance: number;
  userId: number;
}

export const loadAccounts = createAction(
  '[Account] Load Accounts',
  props<{ userId: number }>()  // Changed from string to number
);

export const loadAccountsSuccess = createAction(
  '[Account] Load Accounts Success',
  props<{ accounts: Account[] }>()
);

export const loadAccountsFailure = createAction(
  '[Account] Load Accounts Failure',
  props<{ error: string }>()
);