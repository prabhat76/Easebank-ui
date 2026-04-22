import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { Api } from '../../api';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private api = inject(Api);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action => {
        return this.api.login(action.credentials).pipe(
          tap(response => console.log('🔥 Raw API Response:', response)),
          map(response => {
            console.log('🔥 Processing response:', response);
            
            // Response is already processed by API service
            if (response) {
              console.log('🔥 User from API service:', response);
              return AuthActions.loginSuccess({ user: response });
            } else {
              throw new Error('No user data received');
            }
          }),
          catchError((error: any) => {
            console.log('🔥 Login Error:', error);
            
            let errorMessage = 'Login failed. Please try again.';
            
            if (error?.message) {
              errorMessage = error.message;
            }
            
            return of(AuthActions.loginFailure({ error: errorMessage }));
          })
        );
      })
    );
  });

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user }) => {
        console.log('🔥 Login success, storing user:', user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('easebank_user', JSON.stringify(user));
          if (user.token) {
            localStorage.setItem('easebank_token', user.token);
          }
        }
        this.router.navigate(['/dashboard']);
      })
    ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(({ error }) => {
        console.log('🔥 Login failure:', error);
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('easebank_user');
          localStorage.removeItem('easebank_token');
        }
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  checkStoredAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkStoredAuth),
      map(() => {
        if (!isPlatformBrowser(this.platformId)) {
          return AuthActions.loginFailure({ error: 'Not in browser' });
        }

        const storedUser = localStorage.getItem('easebank_user');
        const storedToken = localStorage.getItem('easebank_token');

        if (storedUser && (storedToken || true)) { // Allow login without token since backend doesn't use JWT
          try {
            const user = JSON.parse(storedUser);
            // Don't require token match since backend doesn't use JWT
            return AuthActions.loginSuccess({ user });
          } catch (error) {
            localStorage.removeItem('easebank_user');
            localStorage.removeItem('easebank_token');
          }
        }

        return AuthActions.loginFailure({ error: 'No stored auth' });
      })
    )
  );
}