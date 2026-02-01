import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="p-6 max-w-md mx-auto">
      <h1 class="text-2xl font-bold mb-6">Transfer Money</h1>
      
      <form [formGroup]="transferForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">From Account</label>
          <select formControlName="fromAccountId" class="w-full p-2 border rounded-lg">
            <option value="">Select Account</option>
            @if (accountService.user$ | async; as user) {
              @for (account of user.accounts; track account.id) {
                <option [value]="account.id">
                  {{account.accountType | titlecase}} - {{account.balance | currency}}
                </option>
              }
            }
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">To Account Number</label>
          <input 
            type="text" 
            formControlName="toAccountNumber"
            class="w-full p-2 border rounded-lg"
            placeholder="Enter account number">
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">Amount</label>
          <input 
            type="number" 
            formControlName="amount"
            class="w-full p-2 border rounded-lg"
            placeholder="0.00">
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-2">Description</label>
          <input 
            type="text" 
            formControlName="description"
            class="w-full p-2 border rounded-lg"
            placeholder="Transfer description">
        </div>
        
        <button 
          type="submit" 
          [disabled]="transferForm.invalid || isLoading"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {{isLoading ? 'Processing...' : 'Transfer'}}
        </button>
      </form>
      
      @if (message) {
        <div class="mt-4 p-3 rounded-lg" [class]="messageClass">
          {{message}}
        </div>
      }
    </div>
  `
})
export class TransferComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  accountService = inject(AccountService);
  
  isLoading = false;
  message = '';
  messageClass = '';

  transferForm = this.fb.group({
    fromAccountId: ['', Validators.required],
    toAccountNumber: ['', [Validators.required, Validators.minLength(10)]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    description: ['', Validators.required]
  });

  onSubmit() {
    if (this.transferForm.valid) {
      this.isLoading = true;
      
      this.accountService.transferMoney(this.transferForm.value as any)
        .subscribe({
          next: () => {
            this.message = 'Transfer completed successfully!';
            this.messageClass = 'bg-green-100 text-green-800';
            this.isLoading = false;
            setTimeout(() => this.router.navigate(['/dashboard']), 2000);
          },
          error: () => {
            this.message = 'Transfer failed. Please try again.';
            this.messageClass = 'bg-red-100 text-red-800';
            this.isLoading = false;
          }
        });
    }
  }
}