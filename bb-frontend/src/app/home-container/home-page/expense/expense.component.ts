import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { SharedService } from 'src/app/services/shared.service';
import { EditExpenseDTO, ExpenseDTO } from 'src/app/dtos/expense.dto';
import { BudgetDTO } from 'src/app/dtos/budget.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent {
  expenses: ExpenseDTO[] | undefined;
  budgets: BudgetDTO[] | undefined;
  selectedBudgets: string[] = [];

  constructor(
    private dialog: MatDialog,
    private sharedService: SharedService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadExpenses();
    this.sharedService.getBudgets().subscribe((budgets) => {
      this.budgets = budgets;
    });
  }

  openCreateExpenseDialog(): void {
    const dialogRef = this.dialog.open(CreateExpenseComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  toggleBudgetSelection(budgetId: string): void {
    if (this.selectedBudgets.includes(budgetId)) {
      // Deselect the budget
      this.selectedBudgets = this.selectedBudgets.filter(
        (id) => id !== budgetId
      );
    } else {
      // Select the budget
      this.selectedBudgets.push(budgetId);
    }
  }

  enableEditMode(expense: ExpenseDTO): void {
    expense.editing = true;
  }

  cancelEdit(expense: ExpenseDTO): void {
    expense.editing = false;
  }
  loadExpenses() {
    this.sharedService.getExpenses().subscribe((expenses) => {
      this.expenses = expenses;
    });
  }

  updateExpense(expense: ExpenseDTO): void {
    this.authService
      .updateExpense$(expense.id, {
        description: expense.description,
        amount: expense.amount,
        budgetId: expense.budgetId,
      })
      .subscribe(
        (updatedExpese) => {
          expense.editing = false;
          this.authService.getExpenses(null).subscribe((expenses) => {
            this.sharedService.updateExpenses(expenses);
          });
        },
        (error) => {
          console.error('Failed to update:', error);
        }
      );
  }

  deleteExpense(expenseId: string) {
    this.authService.deleteExpense$(expenseId).subscribe(() => {
      this.loadExpenses();
    });
  }
}
