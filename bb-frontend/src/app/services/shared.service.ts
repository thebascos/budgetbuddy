import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignUpDTO } from '../dtos/auth.dto';
import { AuthService } from './auth.service';
import { BudgetDTO } from '../dtos/budget.dto';

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

  constructor(private authService: AuthService) {
    this.authService.getUserProfile().subscribe((user) => {
      this.userProfileSubject.next(user);
    });

    this.authService.getBudgets().subscribe((budgets) => {
      this.budgetsSubject.next(budgets);
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
}
