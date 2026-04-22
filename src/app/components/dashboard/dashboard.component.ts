import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { selectUser } from '../../store/auth/auth.selectors';
import { selectAccounts, selectAccountsLoading } from '../../store/account/account.selectors';
import { Account } from '../../store/account/account.actions';
import { AuthUser } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private store = inject(Store<AppState>);
  private router = inject(Router);

  user$: Observable<AuthUser | null> = this.store.select(selectUser);
  accounts$: Observable<Account[]> = this.store.select(selectAccounts);
  accountsLoading$: Observable<boolean> = this.store.select(selectAccountsLoading);

  ngOnInit(): void {
    console.log('📊 Dashboard component initialized');
    
    // Debug observables with more detailed logging
    this.user$.subscribe(user => {
      console.log('👤 Dashboard user:', user);
      if (user) {
        console.log('👤 User ID for accounts:', user.id);
      }
    });
    
    this.accounts$.subscribe(accounts => {
      console.log('🏦 Dashboard accounts:', accounts);
      console.log('🏦 Accounts length:', accounts?.length || 0);
      if (accounts && accounts.length > 0) {
        console.log('🏦 First account:', accounts[0]);
      }
    });
    
    this.accountsLoading$.subscribe(loading => {
      console.log('⏳ Accounts loading state:', loading);
    });
  }

  navigateToTransfer(): void {
    this.router.navigate(['/transfer']);
  }

  navigateToTransactions(): void {
    this.router.navigate(['/transactions']);
  }

  getTotalBalance(accounts: Account[]): number {
    return accounts.reduce((total, account) => total + account.balance, 0);
  }

  getAccountTypeClass(type: string): string {
    switch (type) {
      case 'checking': return 'account-checking';
      case 'savings': return 'account-savings';
      case 'credit': return 'account-credit';
      default: return 'account-default';
    }
  }
}