import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { MobileService } from './services/mobile.service';
import { LogoComponent } from './components/shared/logo.component';
import { BottomNavComponent } from './components/shared/bottom-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, LogoComponent, BottomNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Easebank');
  private authService = inject(AuthService);
  private router = inject(Router);
  private mobileService = inject(MobileService);

  async ngOnInit() {
    await this.mobileService.initializeApp();
    this.authService.checkStoredAuth();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated;
  }

  get isNative() {
    return this.mobileService.isNative;
  }
}