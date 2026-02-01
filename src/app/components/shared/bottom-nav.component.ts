import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden mobile-safe-area z-50">
      <div class="flex justify-around items-center py-1">
        <a routerLink="/dashboard" routerLinkActive="text-blue-600" 
           class="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-600 transition-colors touch-target">
          <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
          </svg>
          <span class="text-xs font-medium">Home</span>
        </a>

        <a routerLink="/wealth" routerLinkActive="text-blue-600"
           class="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-600 transition-colors touch-target">
          <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
          <span class="text-xs font-medium">Wealth</span>
        </a>

        <a routerLink="/cards" routerLinkActive="text-blue-600"
           class="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-600 transition-colors touch-target">
          <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
          </svg>
          <span class="text-xs font-medium">Cards</span>
        </a>

        <a routerLink="/payments" routerLinkActive="text-blue-600"
           class="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-600 transition-colors touch-target">
          <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span class="text-xs font-medium">Pay</span>
        </a>

        <a routerLink="/transactions" routerLinkActive="text-blue-600"
           class="flex flex-col items-center py-2 px-2 text-gray-600 hover:text-blue-600 transition-colors touch-target">
          <svg class="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <span class="text-xs font-medium">History</span>
        </a>
      </div>
    </nav>
  `
})
export class BottomNavComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
}