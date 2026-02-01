import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">My Cards</h1>
        <button class="text-blue-600 text-sm font-medium">Add Card</button>
      </div>

      <!-- Card Carousel -->
      <div class="space-y-4">
        <!-- Credit Card -->
        <div class="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
          <div class="relative z-10">
            <div class="flex justify-between items-start mb-8">
              <div>
                <p class="text-blue-100 text-sm">Credit Card</p>
                <p class="font-semibold">EaseBank Platinum</p>
              </div>
              <div class="text-right">
                <p class="text-blue-100 text-sm">Available</p>
                <p class="font-bold">$8,500</p>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-2xl font-mono tracking-wider">**** **** **** 4532</p>
              <div class="flex justify-between">
                <span class="text-sm">John Doe</span>
                <span class="text-sm">12/26</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Debit Card -->
        <div class="relative bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 text-white overflow-hidden">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
          <div class="relative z-10">
            <div class="flex justify-between items-start mb-8">
              <div>
                <p class="text-gray-300 text-sm">Debit Card</p>
                <p class="font-semibold">EaseBank Classic</p>
              </div>
              <div class="text-right">
                <p class="text-gray-300 text-sm">Balance</p>
                <p class="font-bold">$5,230</p>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-2xl font-mono tracking-wider">**** **** **** 7891</p>
              <div class="flex justify-between">
                <span class="text-sm">John Doe</span>
                <span class="text-sm">08/27</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Controls -->
      <div class="grid grid-cols-2 gap-4">
        <button class="bg-white border border-gray-200 rounded-lg p-4 text-left">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">Freeze Card</p>
              <p class="text-sm text-gray-500">Temporarily block</p>
            </div>
          </div>
        </button>

        <button class="bg-white border border-gray-200 rounded-lg p-4 text-left">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">Set Limits</p>
              <p class="text-sm text-gray-500">Spending controls</p>
            </div>
          </div>
        </button>

        <button class="bg-white border border-gray-200 rounded-lg p-4 text-left">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">Support</p>
              <p class="text-sm text-gray-500">Get help</p>
            </div>
          </div>
        </button>

        <button class="bg-white border border-gray-200 rounded-lg p-4 text-left">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">Statements</p>
              <p class="text-sm text-gray-500">View history</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  `
})
export class CardsComponent {}