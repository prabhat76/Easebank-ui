import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Easebank
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
                [class.border-red-500]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
              
              @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
                <p class="mt-1 text-sm text-red-600">Please enter a valid email address</p>
              }
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                formControlName="password"
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
                [class.border-red-500]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
              
              @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
                <p class="mt-1 text-sm text-red-600">Password is required</p>
              }
            </div>
          </div>

          @if (errorMessage) {
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {{ errorMessage }}
            </div>
          }

          <div>
            <button
              type="submit"
              [disabled]="loginForm.invalid || (authService.isLoading$ | async)"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              
              @if (authService.isLoading$ | async) {
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              } @else {
                Sign in
              }
            </button>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              Demo credentials: <br>
              <span class="font-mono text-xs bg-gray-100 px-2 py-1 rounded">admin@easebank.com / password</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  authService = inject(AuthService);
  
  errorMessage = '';

  loginForm = this.fb.group({
    email: ['admin@easebank.com', [Validators.required, Validators.email]],
    password: ['password', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      
      this.authService.login(this.loginForm.value as any).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      });
    }
  }
}