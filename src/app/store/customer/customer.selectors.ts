import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.reducer';

export const selectCustomerState = createFeatureSelector<CustomerState>('customer');

export const selectCustomer = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.customer
);

export const selectCustomerLoading = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.loading
);

export const selectCustomerError = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.error
);