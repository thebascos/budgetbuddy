import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSavingDTO, CreateSavingDTO } from 'src/app/dtos/saving.dto';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { CreateSavingPlanComponent } from './create-saving-plan/create-saving-plan.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateIncomeComponent } from '../income/create-income/create-income.component';
import { CreateIncomeDTO } from 'src/app/dtos/income.dto';

@Component({
  selector: 'app-saving-plan',
  templateUrl: './saving-plan.component.html',
  styleUrls: ['./saving-plan.component.css'],
})
export class SavingPlanComponent {
  savings: CreateSavingDTO[] | undefined;
  message = 'Expenses for this Budget already exceeded.';
  addSaving: FormGroup;
  incomes: CreateIncomeDTO[] | undefined;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.addSaving = this.fb.group({
      amount: [null, Validators.required],
      incomeId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.getSavings$().subscribe((savings) => {
      this.savings = savings;
    });
    this.authService.getIncomes().subscribe((result) => {
      this.incomes = result.incomes;
    });
  }

  openCreateBudgetDialog(): void {
    const dialogRef = this.dialog.open(CreateSavingPlanComponent, {});
  }

  toggleInlineInput(saving: CreateSavingDTO): void {
    saving.showInlineInput = !saving.showInlineInput;
  }
  onSubmit(saving: CreateSavingDTO) {
    if (this.addSaving.valid) {
      const addSavingData = this.addSaving.value;
      this.authService
        .addSaving$({ ...addSavingData, savingId: saving.id })
        .subscribe(() => {
          saving.showInlineInput = false;
        });
    }
  }
}
