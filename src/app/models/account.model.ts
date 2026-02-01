export interface Account {
  id: string;
  accountNumber: string;
  accountType: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  date: Date;
  category: string;
  balance: number;
}

export interface TransferRequest {
  fromAccountId: string;
  toAccountNumber: string;
  amount: number;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  accounts: Account[];
}