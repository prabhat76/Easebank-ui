import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Transaction History</h1>
      
      @if (transactionsData$ | async; as data) {
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Balance</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                @for (transaction of data.transactions; track transaction.id) {
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{transaction.date | date:'short'}}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{transaction.description}}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{transaction.category}}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                        [class]="transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'">
                      {{transaction.type === 'credit' ? '+' : '-'}}{{transaction.amount | currency}}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{transaction.balance | currency}}
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `
})
export class TransactionsComponent {
  accountService = inject(AccountService);
  
  transactionsData$ = combineLatest([
    this.accountService.user$,
    this.accountService.transactions$
  ]).pipe(
    map(([user, transactions]) => ({
      user,
      transactions: transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }))
  );
}