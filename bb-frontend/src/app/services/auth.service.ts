import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LogInDTO, SignUpDTO } from '../dtos/auth.dto';
import { BudgetDTO } from '../dtos/budget.dto';
import { ExpenseDTO } from '../dtos/expense.dto';
import { CreateBillDTO } from '../dtos/bill.dto';

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

  getBudgets(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.get<any>(`${this.url}/auth/budgets`, { headers });
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

  getBills(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.HttPClient.get<any>(`${this.url}/auth/bills`, { headers });
  }
}
