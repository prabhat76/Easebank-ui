import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';

interface User {
  id: string;
  name: string;
  email: string;
  accounts: Account[];
}

interface Account {
  id: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
  isActive: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  accounts: Account[] = [];
  loading = true;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.authService.currentUser$.subscribe(authUser => {
      if (authUser) {
        // Map AuthUser to User with accounts
        this.user = {
          id: authUser.id,
          name: authUser.name,
          email: authUser.email,
          accounts: [
            {
              id: '1',
              accountNumber: '1234567890',
              accountType: 'checking',
              balance: 5000,
              currency: 'USD',
              isActive: true
            },
            {
              id: '2',
              accountNumber: '0987654321',
              accountType: 'savings',
              balance: 15000,
              currency: 'USD',
              isActive: true
            }
          ]
        };
        this.accounts = this.user.accounts;
        this.loading = false;
      }
    });
  }

  navigateToTransfer(): void {
    this.router.navigate(['/transfer']);
  }

  navigateToTransactions(): void {
    this.router.navigate(['/transactions']);
  }

  getTotalBalance(): number {
    return this.accounts.reduce((total, account) => total + account.balance, 0);
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