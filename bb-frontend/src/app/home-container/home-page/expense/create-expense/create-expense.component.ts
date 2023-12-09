import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BudgetDTO } from 'src/app/dtos/budget.dto';
import { ExpenseDTO } from 'src/app/dtos/expense.dto';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  budgets?: BudgetDTO[];
  selectedBudget?: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<CreateExpenseComponent>,
    private sharedService: SharedService
  ) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      attachment: [null],
      budgetId: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadBudgets();
  }

  loadBudgets() {
    this.authService.getBudgets(null).subscribe((budgets: any) => {
      this.budgets = budgets;
    });
  }
  // onBudgetSelected(event: any) {
  //   this.selectedBudget = event.value;
  // }

  onSubmit() {
    if (this.expenseForm.valid) {
      const expenseData = this.expenseForm.value;
      this.authService.createExpense$(expenseData).subscribe(() => {
        this.authService.getExpenses(null).subscribe((expenses) => {
          this.sharedService.updateExpenses(expenses);
        });
        this.expenseForm.reset();
        this.dialogRef.close();
      });
    }
  }
}
