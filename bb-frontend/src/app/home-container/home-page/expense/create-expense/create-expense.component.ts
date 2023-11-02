import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetDTO } from 'src/app/dtos/budget.dto';
import { ExpenseDTO } from 'src/app/dtos/expense.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  budgets?: BudgetDTO[]; // Define an array to store budgets
  selectedBudget?: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService // Inject AuthService
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
    this.authService.getBudgets().subscribe((budgets: any) => {
      this.budgets = budgets;
      console.log(this.budgets);
    });
  }
  onBudgetSelected(event: any) {
    this.selectedBudget = event.value;
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      // Handle form submission here
      // You can send the data to your backend for further processing.
    }
  }
}
