import { createReducer, on } from '@ngrx/store';
import * as AccountActions from './account.actions';

export interface AccountState {
  accounts: AccountActions.Account[];
  loading: boolean;
  error: string | null;
}

export const initialState: AccountState = {
  accounts: [],
  loading: false,
  error: null
};

export const accountReducer = createReducer(
  initialState,
  on(AccountActions.loadAccounts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AccountActions.loadAccountsSuccess, (state, { accounts }) => ({
    ...state,
    accounts,
    loading: false,
    error: null
  })),
  on(AccountActions.loadAccountsFailure, (state, { error }) => ({
    ...state,
    accounts: [],
    loading: false,
    error
  }))
);