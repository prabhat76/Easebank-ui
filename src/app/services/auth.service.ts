import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, catchError, tap, map } from 'rxjs';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;        // Changed from string to number to match Spring Boot
  firstName: string; // Match backend User entity fields
  lastName: string;
  email: string;
  token?: string;    // Optional since backend doesn't use JWT
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
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const body = {
      email: credentials.email.trim(),
      password: credentials.password
    };

    console.log('🚀 Login Request Details:');
    console.log('URL:', `${this.baseUrl}/auth/login`);
    console.log('Method: POST');
    console.log('Headers:', Object.fromEntries(headers.keys().map(key => [key, headers.get(key)])));
    console.log('Body:', body);
    
    return this.http.post<any>(`${this.baseUrl}/auth/login`, body, { headers }).pipe(
      tap(response => {
        console.log('✅ Raw API Response:', response);
        console.log('Response type:', typeof response);
        console.log('Response keys:', Object.keys(response || {}));
      }),
      map(response => {
        console.log('🔄 Processing response:', response);
        
        // Handle different response formats from Spring Boot
        if (response && response.id && response.email) {
          // Direct user object from Spring Boot
          console.log('✅ Direct user response from Spring Boot');
          return {
            id: response.id,
            firstName: response.firstName || response.first_name || 'User',
            lastName: response.lastName || response.last_name || '',
            email: response.email,
            token: 'session-' + Date.now() // Generate session token since backend doesn't use JWT
          };
        } else if (response && response.success && response.data) {
          console.log('✅ Success response with data');
          return {
            id: response.data.id,
            firstName: response.data.firstName || response.data.first_name || 'User',
            lastName: response.data.lastName || response.data.last_name || '',
            email: response.data.email,
            token: response.data.token || 'session-' + Date.now()
          };
        } else {
          console.log('❌ Invalid response format:', response);
          throw new Error(response?.message || 'Invalid response format from server');
        }
      }),
      tap(user => {
        console.log('✅ Login successful, user:', user);
        this.currentUserSubject.next(user);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('easebank_user', JSON.stringify(user));
          localStorage.setItem('easebank_token', user.token);
        }
        this.isLoadingSubject.next(false);
      }),
      catchError((error: HttpErrorResponse) => {
        this.isLoadingSubject.next(false);
        
        console.log('❌ Login Error Details:');
        console.log('Status:', error.status);
        console.log('Status Text:', error.statusText);
        console.log('Error Object:', error.error);
        console.log('Full Error:', error);
        
        let errorMessage = 'Login failed. Please try again.';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.error?.error) {
          errorMessage = error.error.error;
        } else if (error.status === 401) {
          errorMessage = 'Invalid email or password.';
        } else if (error.status === 0) {
          errorMessage = 'Unable to connect to server. Please check your internet connection.';
        } else if (error.status === 404) {
          errorMessage = 'Login endpoint not found.';
        } else if (error.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        console.log('Final error message:', errorMessage);
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