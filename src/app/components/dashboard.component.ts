import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
      
      @if (accountService.user$ | async; as user) {
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Welcome, {{user.name}}</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          @for (account of user.accounts; track account.id) {
            <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-semibold capitalize">{{account.accountType}} Account</h3>
                  <p class="text-gray-600">****{{account.accountNumber.slice(-4)}}</p>
                </div>
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
              </div>
              <div class="text-2xl font-bold text-gray-900">
                {{account.balance | currency:account.currency}}
              </div>
            </div>
          }
        </div>
        
        <div class="flex gap-4">
          <button routerLink="/transfer" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Transfer Money
          </button>
          <button routerLink="/transactions" class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
            View Transactions
          </button>
        </div>
      }
    </div>
  `
})
export class DashboardComponent {
  accountService = inject(AccountService);
}