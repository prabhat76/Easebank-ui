import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { Api } from '../../api';
import * as AccountActions from './account.actions';
import * as AuthActions from '../auth/auth.actions';

@Injectable()
export class AccountEffects {
  private actions$ = inject(Actions);
  private api = inject(Api);

  // Load accounts when user logs in successfully
  loadAccountsOnLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user }) => console.log('🏦 Loading accounts for user:', user.id)),
      map(({ user }) => AccountActions.loadAccounts({ userId: user.id }))
    )
  );

  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountActions.loadAccounts),
      exhaustMap(action => {
        console.log('🏦 Fetching accounts for user ID:', action.userId);
        
        return this.api.getAccountsByUserId(action.userId).pipe(
          tap(response => console.log('🏦 Raw accounts API response:', response)),
          map(response => {
            console.log('🏦 Processing accounts response:', response);
            
            let accounts: any[] = [];
            
            // Handle Spring Boot response format
            if (Array.isArray(response)) {
              // Direct array response from Spring Boot
              accounts = response;
            } else if (response && (response as any).data && Array.isArray((response as any).data)) {
              // Wrapped response
              accounts = (response as any).data;
            } else if (response && typeof response === 'object' && (response as any).id) {
              // Single account object
              accounts = [response];
            } else {
              console.log('🏦 No accounts found, using empty array');
              accounts = [];
            }
            
            console.log('🏦 Final accounts array:', accounts);
            return AccountActions.loadAccountsSuccess({ accounts });
          }),
          catchError(error => {
            console.error('🏦 Failed to load accounts:', error);
            return of(AccountActions.loadAccountsFailure({ error: error.message || 'Failed to load accounts' }));
          })
        );
      })
    )
  );
}