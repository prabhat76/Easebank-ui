import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MobileService {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get isNative(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    
    // Dynamic import to avoid SSR issues
    return (window as any)?.Capacitor?.isNativePlatform?.() || false;
  }

  get platform(): string {
    if (!isPlatformBrowser(this.platformId)) return 'server';
    
    return (window as any)?.Capacitor?.getPlatform?.() || 'web';
  }

  async initializeApp(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.isNative) return;

    try {
      // Dynamic imports for SSR safety
      const { StatusBar, Style } = await import('@capacitor/status-bar');
      const { App } = await import('@capacitor/app');
      
      await StatusBar.setStyle({ style: Style.Dark });
      
      App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active?', isActive);
      });
    } catch (error) {
      console.log('Capacitor plugins not available');
    }
  }
}