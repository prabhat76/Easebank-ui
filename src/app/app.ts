import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from './store/app.state';
import * as AuthActions from './store/auth/auth.actions';
import { selectIsAuthenticated, selectUser } from './store/auth/auth.selectors';
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
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private mobileService = inject(MobileService);

  isAuthenticated$: Observable<boolean> = this.store.select(selectIsAuthenticated).pipe(
    tap(isAuth => console.log('🔐 Authentication state changed:', isAuth))
  );
  
  user$ = this.store.select(selectUser).pipe(
    tap(user => console.log('👤 User state changed:', user))
  );

  async ngOnInit() {
    console.log('🚀 App initializing...');
    await this.mobileService.initializeApp();
    
    // Check stored auth
    console.log('🔍 Checking stored auth...');
    this.store.dispatch(AuthActions.checkStoredAuth());
    
    // Debug current route
    console.log('📍 Current route:', this.router.url);
  }

  logout() {
    console.log('🚪 Logging out...');
    this.store.dispatch(AuthActions.logout());
  }

  get isNative() {
    return this.mobileService.isNative;
  }
}