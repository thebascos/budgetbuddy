import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GmailSignUpDTO, LogInDTO, SignUpDTO } from '../dtos/auth.dto';
import { BudgetDTO } from '../dtos/budget.dto';
import { EditExpenseDTO, ExpenseDTO } from '../dtos/expense.dto';
import { CreateBillDTO } from '../dtos/bill.dto';
import { CreateIncomeDTO } from '../dtos/income.dto';
import { AddSavingDTO, CreateSavingDTO } from '../dtos/saving.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsSignedIn: boolean = false;
  url = 'http://localhost:3000';
  constructor(readonly HttPClient: HttpClient) {}

  public signUp$(signUpDTO: SignUpDTO) {
    return this.HttPClient.post<{ access_token: string }>(
      `${this.url}/auth/signup`,
      signUpDTO
    ).pipe(
      map((response) => {
        return response.access_token;
      })
    );
  }
  public login$(loginDTO: LogInDTO) {
    return this.HttPClient.post<{ access_token: string }>(
      `${this.url}/auth/login`,
      loginDTO
    ).pipe(
      map((response) => {
        return response.access_token;
      })
    );
  }

  logoutUser$(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.HttPClient.post<any>(`${this.url}/auth/logout`, null, {
      headers,
    });
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.HttPClient.get<any>(`${this.url}/auth/profile`, { headers });
  }

  public createBudget$(budgetData: BudgetDTO) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.post<any>(
      `${this.url}/auth/create-budget`,
      budgetData,
      {
        headers,
      }
    );
  }
  public createIncome$(incomeData: CreateIncomeDTO) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.post<any>(
      `${this.url}/auth/create-income`,
      incomeData,
      {
        headers,
      }
    );
  }

  getIncomes(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.get<any>(`${this.url}/auth/incomes`, { headers });
  }

  public createExpense$(expenseData: ExpenseDTO) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.post<any>(
      `${this.url}/auth/create-expense`,
      expenseData,
      {
        headers,
      }
    );
  }

  getBudgets(incomeId: string | null): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams();
    if (incomeId) {
      params = params.set('incomeId', incomeId);
    }
    return this.HttPClient.get<any>(`${this.url}/auth/budgets`, {
      headers,
      params,
    });
  }

  getExpenses(budgetId: string | null): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = new HttpParams();
    if (budgetId) {
      params = params.set('budgetId', budgetId);
    }

    return this.HttPClient.get<any>(`${this.url}/auth/expenses`, {
      headers,
      params,
    });
  }

  updateExpense$(
    expenseId: string,
    updatedExpenseData: EditExpenseDTO
  ): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('log out or something?');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.HttPClient.put<any>(
      `${this.url}/auth/expense/${expenseId}`,
      updatedExpenseData,
      {
        headers,
      }
    );
  }

  deleteExpense$(expenseId: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('log out or something?');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.HttPClient.delete<any>(
      `${this.url}/auth/expense/${expenseId}`,
      {
        headers,
      }
    );
  }

  public createBill$(billData: CreateBillDTO) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.post<any>(`${this.url}/auth/create-bill`, billData, {
      headers,
    });
  }
  public resetBill$(billData: CreateBillDTO) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.put<any>(`${this.url}/auth/reset-bill`, billData, {
      headers,
    });
  }

  getBills(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.get<any>(`${this.url}/auth/bills`, { headers });
  }

  createCheckoutSession(bill: CreateBillDTO): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.HttPClient.post<any>(
      `${this.url}/auth/create-checkout-session`,
      bill,
      {
        headers,
      }
    );
  }
  getSavings$(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.get<any>(`${this.url}/auth/savings`, {
      headers,
    });
  }
  public addSaving$(addSavingData: AddSavingDTO) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.post<any>(
      `${this.url}/auth/add-saving`,
      addSavingData,
      {
        headers,
      }
    );
  }

  public createSaving$(savingData: CreateSavingDTO) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.post<any>(
      `${this.url}/auth/create-saving`,
      savingData,
      {
        headers,
      }
    );
  }

  editUser$(updatedUserData: SignUpDTO): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.HttPClient.put<any>(
      `${this.url}/auth/update`,
      updatedUserData,
      {
        headers,
      }
    );
  }

  gmailSignUp$(googleResponse: any): Observable<any> {
    return this.HttPClient.post<{ access_token: string }>(
      `${this.url}/auth/gmail-signup`,
      googleResponse
    ).pipe(
      map((response) => {
        return response.access_token;
      })
    );
  }

  // public signUp$(signUpDTO: SignUpDTO) {
  //   return this.HttPClient.post<{ access_token: string }>(
  //     `${this.url}/auth/signup`,
  //     signUpDTO
  //   ).pipe(
  //     map((response) => {
  //       return response.access_token;
  //     })
  //   );
  // }
}
