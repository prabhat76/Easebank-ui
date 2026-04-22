import { AuthUser } from '../../services/auth.service';

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}