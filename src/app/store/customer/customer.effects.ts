import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { Api } from '../../api';
import * as CustomerActions from './customer.actions';

@Injectable()
export class CustomerEffects {
  private actions$ = inject(Actions);
  private api = inject(Api);

  loadCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomer),
      exhaustMap(action => {
        console.log('👤 Fetching customer for ID:', action.customerId);
        
        return this.api.getCustomerById(action.customerId).pipe(
          tap(response => console.log('👤 Customer API response:', response)),
          map(response => {
            if (response) {
              return CustomerActions.loadCustomerSuccess({ customer: response });
            } else {
              throw new Error('Failed to load customer');
            }
          }),
          catchError(error => {
            console.error('👤 Failed to load customer:', error);
            return of(CustomerActions.loadCustomerFailure({ error: error.message || 'Failed to load customer' }));
          })
        );
      })
    )
  );
}