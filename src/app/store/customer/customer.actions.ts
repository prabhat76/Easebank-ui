import { createAction, props } from '@ngrx/store';

// Updated to match Spring Boot User entity
export interface Customer {
  id: number;        // Changed from string to number
  firstName: string; // Match backend field names
  lastName: string;
  email: string;
}

export const loadCustomer = createAction(
  '[Customer] Load Customer',
  props<{ customerId: string }>()
);

export const loadCustomerSuccess = createAction(
  '[Customer] Load Customer Success',
  props<{ customer: Customer }>()
);

export const loadCustomerFailure = createAction(
  '[Customer] Load Customer Failure',
  props<{ error: string }>()
);