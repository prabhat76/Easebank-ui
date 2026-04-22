import { AuthState } from './auth/auth.state';
import { AccountState } from './account/account.reducer';

export interface AppState {
  auth: AuthState;
  accounts: AccountState;
}