import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Account, Transaction, TransferRequest, User } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  user$ = this.userSubject.asObservable();
  transactions$ = this.transactionsSubject.asObservable();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
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

    const mockTransactions: Transaction[] = [
      {
        id: '1',
        accountId: '1',
        type: 'debit',
        amount: 50,
        description: 'Coffee Shop',
        date: new Date('2024-01-15'),
        category: 'Food',
        balance: 5000
      },
      {
        id: '2',
        accountId: '1',
        type: 'credit',
        amount: 2000,
        description: 'Salary',
        date: new Date('2024-01-14'),
        category: 'Income',
        balance: 5050
      }
    ];

    this.userSubject.next(mockUser);
    this.transactionsSubject.next(mockTransactions);
  }

  getAccountById(id: string): Observable<Account | undefined> {
    return this.user$.pipe(
      map(user => user?.accounts.find(account => account.id === id))
    );
  }

  transferMoney(request: TransferRequest): Observable<boolean> {
    return this.user$.pipe(
      tap(user => {
        if (!user) return;
        
        const fromAccount = user.accounts.find(acc => acc.id === request.fromAccountId);
        if (fromAccount && fromAccount.balance >= request.amount) {
          fromAccount.balance -= request.amount;
          
          const newTransaction: Transaction = {
            id: Date.now().toString(),
            accountId: request.fromAccountId,
            type: 'debit',
            amount: request.amount,
            description: request.description,
            date: new Date(),
            category: 'Transfer',
            balance: fromAccount.balance
          };
          
          const currentTransactions = this.transactionsSubject.value;
          this.transactionsSubject.next([newTransaction, ...currentTransactions]);
          this.userSubject.next({ ...user });
        }
      }),
      map(() => true)
    );
  }

  getTransactionsByAccountId(accountId: string): Observable<Transaction[]> {
    return this.transactions$.pipe(
      map(transactions => transactions.filter(t => t.accountId === accountId))
    );
  }
}