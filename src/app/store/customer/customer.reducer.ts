import { createReducer, on } from '@ngrx/store';
import * as CustomerActions from './customer.actions';

export interface CustomerState {
  customer: CustomerActions.Customer | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CustomerState = {
  customer: null,
  loading: false,
  error: null
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomer, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomerActions.loadCustomerSuccess, (state, { customer }) => ({
    ...state,
    customer,
    loading: false,
    error: null
  })),
  on(CustomerActions.loadCustomerFailure, (state, { error }) => ({
    ...state,
    customer: null,
    loading: false,
    error
  }))
);