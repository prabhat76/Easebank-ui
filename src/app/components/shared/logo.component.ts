import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-3" [class]="containerClass">
      <!-- Bank Icon -->
      <div class="relative" [class]="iconContainerClass">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl transform rotate-3"></div>
        <div class="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-3 shadow-lg">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <path d="M12 7v10M8 9h8M8 15h8" stroke="currentColor" stroke-width="1.5" fill="none"/>
          </svg>
        </div>
      </div>
      
      <!-- Brand Text -->
      <div class="flex flex-col">
        <h1 class="font-bold text-gray-900 leading-tight" [class]="titleClass">
          <span class="text-blue-600">Ease</span><span class="text-gray-800">Bank</span>
        </h1>
        @if (showTagline) {
          <p class="text-gray-500 text-xs font-medium">Banking Made Simple</p>
        }
      </div>
    </div>
  `
})
export class LogoComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showTagline = true;

  get containerClass(): string {
    return this.size === 'sm' ? 'space-x-2' : 'space-x-3';
  }

  get iconContainerClass(): string {
    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12', 
      lg: 'w-16 h-16'
    };
    return sizes[this.size];
  }

  get titleClass(): string {
    const sizes = {
      sm: 'text-lg',
      md: 'text-2xl',
      lg: 'text-3xl'
    };
    return sizes[this.size];
  }
}