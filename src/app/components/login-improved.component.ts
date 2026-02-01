import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-improved.service';

@Component({
  selector: 'app-login-improved',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md w-full space-y-8">
        <h2 class="text-3xl font-bold text-center">Login to Easebank</h2>
        
        <!-- Loading State -->
        @if (authService.loading$ | async) {
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <p>Signing you in...</p>
          </div>
        }
        
        <!-- Error State -->
        @if (authService.error$ | async; as error) {
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {{ error }}
            <button (click)="authService.clearError()" class="float-right">×</button>
          </div>
        }
        
        <!-- Login Form -->
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="space-y-4">
            <input 
              type="email" 
              formControlName="email"
              placeholder="Email"
              class="w-full p-3 border rounded-lg">
            
            <input 
              type="password" 
              formControlName="password"
              placeholder="Password"
              class="w-full p-3 border rounded-lg">
            
            <button 
              type="submit" 
              [disabled]="loginForm.invalid || (authService.loading$ | async)"
              class="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginImprovedComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['admin@easebank.com', [Validators.required, Validators.email]],
    password: ['password', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as any;
      
      this.authService.login(credentials).subscribe({
        next: (user) => {
          // Success case - navigate to dashboard
          console.log('Login successful:', user);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          // Error case - error is already handled in service
          console.log('Login failed:', error.message);
          // UI will automatically show error via authService.error$
        }
      });
    }
  }
}