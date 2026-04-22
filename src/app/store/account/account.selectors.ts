import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from './account.reducer';

export const selectAccountState = createFeatureSelector<AccountState>('accounts');

export const selectAccounts = createSelector(
  selectAccountState,
  (state: AccountState) => state.accounts
);

export const selectAccountsLoading = createSelector(
  selectAccountState,
  (state: AccountState) => state.loading
);

export const selectAccountsError = createSelector(
  selectAccountState,
  (state: AccountState) => state.error
);