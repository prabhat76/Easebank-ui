import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError, catchError, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'https://easebankv3.onrender.com/api/';
  
  // Single state object - easier to manage
  private stateSubject = new BehaviorSubject<AuthState>({
    user: null,
    loading: false,
    error: null
  });

  // Public observables
  state$ = this.stateSubject.asObservable();
  user$ = this.state$.pipe(map(state => state.user));
  loading$ = this.state$.pipe(map(state => state.loading));
  error$ = this.state$.pipe(map(state => state.error));

  get isAuthenticated(): boolean {
    return !!this.stateSubject.value.user;
  }

  login(credentials: LoginCredentials): Observable<AuthUser> {
    // Set loading state
    this.updateState({ loading: true, error: null });

    return this.http.post<any>(this.baseUrl + 'auth/login', credentials).pipe(
      map(response => {
        // If/else logic for API response
        if (response && response.success) {
          return response.data; // Success case
        } else {
          throw new Error(response?.message || 'Login failed');
        }
      }),
      tap(user => {
        // Success: Update state and store user
        this.updateState({ 
          user, 
          loading: false, 
          error: null 
        });
        localStorage.setItem('easebank_user', JSON.stringify(user));
      }),
      catchError(error => {
        // Error: Update state with error
        this.updateState({ 
          loading: false, 
          error: error.message || 'Login failed' 
        });
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    // Clear state and storage
    this.updateState({ 
      user: null, 
      loading: false, 
      error: null 
    });
    localStorage.removeItem('easebank_user');
  }

  checkStoredAuth(): void {
    const storedUser = localStorage.getItem('easebank_user');
    
    // If/else for stored authentication
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.updateState({ user, loading: false, error: null });
      } catch (error) {
        // Invalid stored data
        localStorage.removeItem('easebank_user');
        this.updateState({ user: null, loading: false, error: null });
      }
    }
  }

  clearError(): void {
    this.updateState({ error: null });
  }

  // Helper method to update state
  private updateState(partial: Partial<AuthState>): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...partial });
  }
}