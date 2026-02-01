import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, of } from 'rxjs';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl: string = 'https://easebankv3.onrender.com/api/';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUserLoggedIn(credentials: any): Observable<ApiResponse<any>> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.post<any>(this.baseUrl + 'auth/login', credentials).pipe(
      tap(() => this.loadingSubject.next(false)),
      catchError(error => {
        this.loadingSubject.next(false);
        this.errorSubject.next(error.message || 'Login failed');
        return of({ success: false, error: error.message });
      }),
      tap(response => {
        if (response.success) {
          // Success state
          this.errorSubject.next(null);
        } else {
          // Error state
          this.errorSubject.next(response.error || 'Unknown error');
        }
      })
    );
  }
}
