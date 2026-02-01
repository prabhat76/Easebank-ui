import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, catchError, tap, map } from 'rxjs';

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

export interface LoginResponse {
  success: boolean;
  data?: {
    user: AuthUser;
    token: string;
  };
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'https://easebankv3.onrender.com/api';
  
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUserSubject.asObservable();
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  login(credentials: LoginCredentials): Observable<AuthUser> {
    this.isLoadingSubject.next(true);
    
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials).pipe(
      map(response => {
        if (response.success && response.data) {
          return {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            token: response.data.token
          };
        } else {
          throw new Error(response.message || 'Login failed');
        }
      }),
      tap(user => {
        this.currentUserSubject.next(user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('easebank_user', JSON.stringify(user));
          localStorage.setItem('easebank_token', user.token);
        }
        this.isLoadingSubject.next(false);
      }),
      catchError((error: HttpErrorResponse) => {
        this.isLoadingSubject.next(false);
        let errorMessage = 'Login failed. Please try again.';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 401) {
          errorMessage = 'Invalid email or password.';
        } else if (error.status === 0) {
          errorMessage = 'Unable to connect to server. Please check your internet connection.';
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('easebank_user');
      localStorage.removeItem('easebank_token');
    }
  }

  checkStoredAuth(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    const storedUser = localStorage.getItem('easebank_user');
    const storedToken = localStorage.getItem('easebank_token');
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        if (user.token === storedToken) {
          this.currentUserSubject.next(user);
        } else {
          this.clearStoredAuth();
        }
      } catch (error) {
        this.clearStoredAuth();
      }
    }
  }

  private clearStoredAuth(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('easebank_user');
      localStorage.removeItem('easebank_token');
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('easebank_token');
  }
}