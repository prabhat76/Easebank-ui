import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';

export const authGuard = () => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  console.log('🛡️ Auth guard triggered');

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map(isAuthenticated => {
      console.log('🛡️ Auth guard - isAuthenticated:', isAuthenticated);
      
      if (isAuthenticated) {
        console.log('✅ Auth guard - Access granted');
        return true;
      } else {
        console.log('❌ Auth guard - Access denied, redirecting to login');
        router.navigate(['/login']);
        return false;
      }
    })
  );
};