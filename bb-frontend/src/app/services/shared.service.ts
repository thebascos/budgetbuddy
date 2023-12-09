import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignUpDTO } from '../dtos/auth.dto';
import { AuthService } from './auth.service';
import { BudgetDTO } from '../dtos/budget.dto';
import { ExpenseDTO } from '../dtos/expense.dto';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userProfileSubject = new BehaviorSubject<SignUpDTO | undefined>(
    undefined
  );
  private budgetsSubject = new BehaviorSubject<BudgetDTO[] | undefined>(
    undefined
  );

  private expensesSubject = new BehaviorSubject<ExpenseDTO[] | undefined>(
    undefined
  );
  private deletedExpenseSubject = new BehaviorSubject<string | undefined>(
    undefined
  );

  constructor(private authService: AuthService) {
    this.authService.getUserProfile().subscribe((user) => {
      this.userProfileSubject.next(user);
    });

    this.authService.getBudgets(null).subscribe((budgets) => {
      this.budgetsSubject.next(budgets);
    });

    this.authService.getExpenses(null).subscribe((expenses) => {
      this.expensesSubject.next(expenses.reverse());
    });
  }

  getUserProfile(): Observable<SignUpDTO | undefined> {
    return this.userProfileSubject.asObservable();
  }

  setUserProfile(userProfile: SignUpDTO): void {
    this.userProfileSubject.next(userProfile);
  }

  getBudgets(): Observable<BudgetDTO[] | undefined> {
    return this.budgetsSubject.asObservable();
  }

  updateBudgets(newBudgets: BudgetDTO[]): void {
    this.budgetsSubject.next(newBudgets);
  }

  getExpenses(): Observable<ExpenseDTO[] | undefined> {
    return this.expensesSubject.asObservable();
  }
  updateExpenses(newExpenses: ExpenseDTO[]): void {
    this.expensesSubject.next(newExpenses);
  }

  getDeletedExpenseId(): Observable<string | undefined> {
    return this.deletedExpenseSubject.asObservable();
  }

  setDeletedExpenseId(expenseId: string): void {
    this.deletedExpenseSubject.next(expenseId);
  }

}
