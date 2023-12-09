import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SOURCE_ACCOUNTS } from 'src/app/dtos/income.dto';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.css'],
})
export class CreateIncomeComponent {
  incomeForm: FormGroup;
  selectedBudget?: string;
  accounts: string[] = Object.values(SOURCE_ACCOUNTS);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<CreateIncomeComponent>
  ) {
    this.incomeForm = this.fb.group({
      source: ['', Validators.required],
      source_account: ['', Validators.required],
      amount: [null],
      incomeId: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const incomeData = this.incomeForm.value;
      this.authService.createIncome$(incomeData).subscribe(() => {
        this.incomeForm.reset();
        this.dialogRef.close();
      });
    }
  }
}
