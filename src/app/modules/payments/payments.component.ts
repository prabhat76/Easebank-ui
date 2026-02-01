import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Payments</h1>
        <button class="text-blue-600 text-sm font-medium">Scan QR</button>
      </div>

      <!-- Quick Pay -->
      <div class="bg-blue-50 rounded-xl p-4">
        <h2 class="font-semibold text-gray-900 mb-3">Quick Pay</h2>
        <div class="flex space-x-3 overflow-x-auto">
          <div class="flex-shrink-0 text-center">
            <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
              <span class="text-white font-semibold">A</span>
            </div>
            <p class="text-xs text-gray-600">Alice</p>
          </div>
          <div class="flex-shrink-0 text-center">
            <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-2">
              <span class="text-white font-semibold">B</span>
            </div>
            <p class="text-xs text-gray-600">Bob</p>
          </div>
          <div class="flex-shrink-0 text-center">
            <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-2">
              <span class="text-white font-semibold">C</span>
            </div>
            <p class="text-xs text-gray-600">Carol</p>
          </div>
          <div class="flex-shrink-0 text-center">
            <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-2">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
            <p class="text-xs text-gray-600">Add</p>
          </div>
        </div>
      </div>

      <!-- Payment Options -->
      <div class="grid grid-cols-2 gap-4">
        <button class="bg-white border border-gray-200 rounded-xl p-4 text-left hover:bg-gray-50">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">Send Money</p>
              <p class="text-sm text-gray-500">To contacts</p>
            </div>
          </div>
        </button>

        <button class="bg-white border border-gray-200 rounded-xl p-4 text-left hover:bg-gray-50">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">Request Money</p>
              <p class="text-sm text-gray-500">From others</p>
            </div>
          </div>
        </button>

        <button class="bg-white border border-gray-200 rounded-xl p-4 text-left hover:bg-gray-50">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">Pay Bills</p>
              <p class="text-sm text-gray-500">Utilities & more</p>
            </div>
          </div>
        </button>

        <button class="bg-white border border-gray-200 rounded-xl p-4 text-left hover:bg-gray-50">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <p class="font-medium text-gray-900">Mobile Recharge</p>
              <p class="text-sm text-gray-500">Top up phone</p>
            </div>
          </div>
        </button>
      </div>

      <!-- Recent Payments -->
      <div class="space-y-3">
        <h3 class="font-semibold text-gray-900">Recent Payments</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between bg-white p-3 rounded-lg border">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span class="text-white font-semibold text-sm">A</span>
              </div>
              <div>
                <p class="font-medium text-gray-900">Alice Johnson</p>
                <p class="text-sm text-gray-500">Today, 2:30 PM</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">-$50.00</p>
              <p class="text-sm text-green-600">Completed</p>
            </div>
          </div>

          <div class="flex items-center justify-between bg-white p-3 rounded-lg border">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div>
                <p class="font-medium text-gray-900">Electric Bill</p>
                <p class="text-sm text-gray-500">Yesterday, 10:15 AM</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">-$125.50</p>
              <p class="text-sm text-green-600">Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PaymentsComponent {}