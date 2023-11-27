import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { SharedService } from 'src/app/services/shared.service';
import { ExpenseDTO } from 'src/app/dtos/expense.dto';
import { BudgetDTO } from 'src/app/dtos/budget.dto';

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
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getExpenses().subscribe((expenses) => {
      this.expenses = expenses;
    });
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
}
