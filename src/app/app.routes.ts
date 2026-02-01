import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransferComponent } from './components/transfer.component';
import { TransactionsComponent } from './components/transactions.component';
import { WealthComponent } from './modules/wealth/wealth.component';
import { CardsComponent } from './modules/cards/cards.component';
import { PaymentsComponent } from './modules/payments/payments.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'wealth', component: WealthComponent, canActivate: [authGuard] },
  { path: 'cards', component: CardsComponent, canActivate: [authGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [authGuard] },
  { path: 'transfer', component: TransferComponent, canActivate: [authGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [authGuard] }
];