import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, of, map } from 'rxjs';

// Backend Entity Interfaces matching Spring Boot models
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Account {
  accountId: number;    // Match backend response
  accountNumber: string;
  accountType: string;
  balance: number;
  userId: number;
}

export interface Transaction {
  transactionId: string;
  amount: number;
  type: string;
  description: string;
  timestamp: string;
}

export interface TransactionResponse {
  accountId: string;
  size: number;
  page: number;
  transactions: Transaction[];
  totalElements: number;
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private baseUrl = 'https://easebankv3.onrender.com/api'; // Correct endpoint
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  // Authentication
  login(credentials: { email: string; password: string }): Observable<User> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.post<User>(`${this.baseUrl}/auth/login`, credentials, { 
      headers: this.getHeaders() 
    }).pipe(
      tap(response => {
        console.log('✅ Login Response:', response);
        this.loadingSubject.next(false);
      }),
      catchError(this.handleError('Login failed'))
    );
  }

  // Account Management - Use discovered endpoint
  getAccountsByUserId(userId: number): Observable<Account[]> {
    this.loadingSubject.next(true);
    
    // Use the working endpoint: /api/accounts/{userId}
    return this.http.get<Account>(`${this.baseUrl}/accounts/${userId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      map(account => [account]), // Convert single account to array
      tap(accounts => {
        console.log('✅ Accounts Response:', accounts);
        this.loadingSubject.next(false);
      }),
      catchError(this.handleError('Failed to fetch accounts'))
    );
  }

  getAccountById(accountId: number): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/accounts/${accountId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError('Failed to fetch account'))
    );
  }

  // Transaction Management - Use discovered endpoint
  getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
    return this.http.get<TransactionResponse>(`${this.baseUrl}/transactions/account/${accountId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      map(response => response.transactions), // Extract transactions array
      catchError(this.handleError('Failed to fetch transactions'))
    );
  }

  // Banking Operations
  deposit(accountId: number, amount: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/transactions/deposit`, {
      accountId, amount
    }, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError('Deposit failed'))
    );
  }

  withdraw(accountId: number, amount: number): Observable<Transaction> {
    console.log('💸 Withdraw request:', { accountId, amount });
    
    const body = { accountId, amount };
    
    return this.http.post<Transaction>(`${this.baseUrl}/transactions/withdraw`, body, {
      headers: this.getHeaders() 
    }).pipe(
      tap(response => console.log('✅ Withdraw Response:', response)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.log('🔄 Trying /api/transactions/withdraw...');
          return this.http.post<Transaction>(`${this.baseUrl}/api/transactions/withdraw`, body, {
            headers: this.getHeaders() 
          }).pipe(
            catchError(() => {
              console.log('🔄 Trying /withdraw...');
              return this.http.post<Transaction>(`${this.baseUrl}/withdraw`, body, {
                headers: this.getHeaders() 
              }).pipe(
                catchError(this.handleError('All withdraw endpoints failed'))
              );
            })
          );
        }
        return this.handleError('Withdrawal failed')(error);
      })
    );
  }

  transfer(fromAccountId: number, toAccountId: number, amount: number): Observable<Transaction> {
    console.log('🔄 Transfer request:', { fromAccountId, toAccountId, amount });
    
    const body = { fromAccountId, toAccountId, amount };
    
    return this.http.post<Transaction>(`${this.baseUrl}/transactions/transfer`, body, {
      headers: this.getHeaders() 
    }).pipe(
      tap(response => console.log('✅ Transfer Response:', response)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.log('🔄 Trying /api/transactions/transfer...');
          return this.http.post<Transaction>(`${this.baseUrl}/api/transactions/transfer`, body, {
            headers: this.getHeaders() 
          }).pipe(
            catchError(() => {
              console.log('🔄 Trying /transfer...');
              return this.http.post<Transaction>(`${this.baseUrl}/transfer`, body, {
                headers: this.getHeaders() 
              }).pipe(
                catchError(this.handleError('All transfer endpoints failed'))
              );
            })
          );
        }
        return this.handleError('Transfer failed')(error);
      })
    );
  }

  createTransaction(transaction: {
    amount: number;
    type: string;
    fromAccountId?: number;
    toAccountId?: number;
  }): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}/transactions`, transaction, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError('Transaction failed'))
    );
  }

  private handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<any> => {
      console.error(`${operation}:`, error);
      this.loadingSubject.next(false);
      
      let errorMessage = operation;
      if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (error.status === 0) {
        errorMessage = 'Network error - check connection';
      } else if (error.status === 404) {
        errorMessage = 'Resource not found';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized access';
      }
      
      this.errorSubject.next(errorMessage);
      return of(null);
    };
  }

  // Test endpoint availability
  testEndpoints(): void {
    const testUrls = [
      'https://easebankv3.onrender.com/api/auth/login',
      'https://easebankv3.onrender.com/auth/login', 
      'https://easebankv3.onrender.com/login',
      'https://easebankv3.onrender.com/api/login'
    ];
    
    testUrls.forEach(url => {
      this.http.options(url, { headers: this.getHeaders() }).subscribe({
        next: () => console.log('✅ Endpoint available:', url),
        error: (err) => console.log('❌ Endpoint not available:', url, err.status)
      });
    });
  }

  // Legacy compatibility methods
  getUserLoggedIn(credentials: { email: string; password: string }): Observable<any> {
    return this.login(credentials);
  }

  getCustomerById(customerId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${customerId}`, { 
      headers: this.getHeaders() 
    }).pipe(
      catchError(this.handleError('Failed to fetch user'))
    );
  }
}
