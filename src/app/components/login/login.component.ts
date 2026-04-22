import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppState } from '../../store/app.state';
import * as AuthActions from '../../store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../store/auth/auth.selectors';
import { LogoComponent } from '../shared/logo.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store<AppState>);
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  error$: Observable<string | null> = this.store.select(selectAuthError);

  loginForm = this.fb.group({
    email: ['admin@test.com', [Validators.required, Validators.email]],
    password: ['password123', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
    // Endpoint testing removed - using correct endpoints now
    console.log('🔍 Login component initialized');
  }

  // Direct API test without NgRx
  testDirectAPI(): void {
    const credentials = this.loginForm.value as { email: string; password: string };
    
    console.log('🧪 Testing Direct API Call...');
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const body = {
      email: credentials.email,
      password: credentials.password
    };

    console.log('Request URL:', 'https://easebankv3.onrender.com/api/auth/login');
    console.log('Request Headers:', headers.keys());
    console.log('Request Body:', body);

    this.http.post('https://easebankv3.onrender.com/api/auth/login', body, { headers }).subscribe({
      next: (response) => {
        console.log('✅ Direct API Success:', response);
      },
      error: (error) => {
        console.log('❌ Direct API Error:', error);
        console.log('Error Status:', error.status);
        console.log('Error Message:', error.message);
        console.log('Error Body:', error.error);
      }
    });
  }

  // Test with AuthService directly
  testAuthService(): void {
    const credentials = this.loginForm.value as { email: string; password: string };
    
    console.log('🔧 Testing AuthService...');
    
    this.authService.login(credentials).subscribe({
      next: (user: any) => {
        console.log('✅ AuthService Success:', user);
      },
      error: (error: any) => {
        console.log('❌ AuthService Error:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as { email: string; password: string };
      
      console.log('🚀 Form submitted with:', credentials);
      
      // Test all methods
      this.testDirectAPI();
      this.testAuthService();
      
      // Also try NgRx
      console.log('📦 Dispatching NgRx action...');
      this.store.dispatch(AuthActions.login({ credentials }));
    } else {
      console.log('❌ Form is invalid');
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        console.log(`Field ${key}:`, control?.value, 'Valid:', control?.valid, 'Errors:', control?.errors);
        control?.markAsTouched();
      });
    }
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}