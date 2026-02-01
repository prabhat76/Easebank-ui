// 🎯 PRACTICAL IF/ELSE PATTERNS IN RXJS - LEARN THESE!

import { Observable, of, throwError, map, catchError, tap, filter, switchMap } from 'rxjs';

// ✅ 1. BASIC IF/ELSE WITH MAP
const checkUserAge = (age: number): Observable<string> => {
  return of(age).pipe(
    map(age => {
      if (age >= 18) {
        return 'Adult';
      } else {
        return 'Minor';
      }
    })
  );
};

// ✅ 2. IF/ELSE WITH ERROR HANDLING
const validateLogin = (credentials: any): Observable<any> => {
  return of(credentials).pipe(
    map(creds => {
      if (creds.email && creds.password) {
        return { success: true, user: creds };
      } else {
        throw new Error('Invalid credentials');
      }
    }),
    catchError(error => {
      return of({ success: false, error: error.message });
    })
  );
};

// ✅ 3. CONDITIONAL STREAMS WITH FILTER
const getActiveUsers = (users: any[]): Observable<any[]> => {
  return of(users).pipe(
    map(users => users.filter(user => {
      if (user.status === 'active') {
        return true;
      } else {
        return false;
      }
    }))
  );
};

// ✅ 4. SWITCHMAP WITH CONDITIONS
const getUserData = (userId: string): Observable<any> => {
  return of(userId).pipe(
    switchMap(id => {
      if (id) {
        return of({ id, name: 'John Doe' });
      } else {
        return of({ id: null, name: 'Guest' });
      }
    })
  );
};

// ✅ 5. TAP FOR SIDE EFFECTS WITH CONDITIONS
const processPayment = (amount: number): Observable<any> => {
  return of(amount).pipe(
    tap(amount => {
      if (amount > 1000) {
        console.log('High value transaction');
      } else {
        console.log('Regular transaction');
      }
    }),
    map(amount => ({ amount, processed: true }))
  );
};

export {
  checkUserAge,
  validateLogin,
  getActiveUsers,
  getUserData,
  processPayment
};