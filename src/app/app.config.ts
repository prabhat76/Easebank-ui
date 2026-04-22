import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './interceptors/auth.interceptor';
import { authReducer } from './store/auth/auth.reducer';
import { accountReducer } from './store/account/account.reducer';
import { customerReducer } from './store/customer/customer.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { AccountEffects } from './store/account/account.effects';
import { CustomerEffects } from './store/customer/customer.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    provideStore({ 
      auth: authReducer,
      accounts: accountReducer,
      customer: customerReducer 
    }),
    provideEffects([AuthEffects, AccountEffects, CustomerEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideClientHydration(withEventReplay())
  ]
};