import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wealth',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Wealth Management</h1>
        <button class="text-blue-600 text-sm font-medium">View All</button>
      </div>

      <!-- Portfolio Overview -->
      <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <h2 class="text-lg font-semibold mb-2">Total Portfolio Value</h2>
        <div class="text-3xl font-bold mb-2">$125,430.50</div>
        <div class="flex items-center text-green-100">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"/>
          </svg>
          <span>+12.5% this month</span>
        </div>
      </div>

      <!-- Investment Categories -->
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white rounded-lg p-4 shadow-sm border">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-gray-900">Stocks</h3>
            <span class="text-green-600 text-sm">+8.2%</span>
          </div>
          <div class="text-xl font-bold text-gray-900">$75,200</div>
          <div class="text-sm text-gray-500">60% of portfolio</div>
        </div>

        <div class="bg-white rounded-lg p-4 shadow-sm border">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-gray-900">Bonds</h3>
            <span class="text-green-600 text-sm">+3.1%</span>
          </div>
          <div class="text-xl font-bold text-gray-900">$35,100</div>
          <div class="text-sm text-gray-500">28% of portfolio</div>
        </div>

        <div class="bg-white rounded-lg p-4 shadow-sm border">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-gray-900">Crypto</h3>
            <span class="text-red-600 text-sm">-2.4%</span>
          </div>
          <div class="text-xl font-bold text-gray-900">$10,500</div>
          <div class="text-sm text-gray-500">8% of portfolio</div>
        </div>

        <div class="bg-white rounded-lg p-4 shadow-sm border">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-medium text-gray-900">Cash</h3>
            <span class="text-gray-600 text-sm">0.0%</span>
          </div>
          <div class="text-xl font-bold text-gray-900">$4,630</div>
          <div class="text-sm text-gray-500">4% of portfolio</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="space-y-3">
        <h3 class="font-semibold text-gray-900">Quick Actions</h3>
        <div class="grid grid-cols-2 gap-3">
          <button class="bg-blue-600 text-white p-3 rounded-lg font-medium">Buy Stocks</button>
          <button class="bg-gray-100 text-gray-900 p-3 rounded-lg font-medium">Rebalance</button>
        </div>
      </div>
    </div>
  `
})
export class WealthComponent {}