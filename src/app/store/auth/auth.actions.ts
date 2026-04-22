import { createAction, props } from '@ngrx/store';
import { AuthUser, LoginCredentials } from '../../services/auth.service';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginCredentials }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: AuthUser }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const checkStoredAuth = createAction('[Auth] Check Stored Auth');