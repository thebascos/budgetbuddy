import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BudgetDTO } from 'src/app/dtos/budget.dto';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateBudgetComponent {
  budgetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<CreateBudgetComponent>,
    private sharedService: SharedService
  ) {
    this.budgetForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      const budgetData = this.budgetForm.value;
      this.authService.createBudget$(budgetData).subscribe(() => {
        this.authService.getBudgets().subscribe((budgets) => {
          this.sharedService.updateBudgets(budgets);
        });
        this.budgetForm.reset();
        this.dialogRef.close();
      });
    }
  }
}
