import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateIncomeDTO } from 'src/app/dtos/income.dto';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-create-saving-plan',
  templateUrl: './create-saving-plan.component.html',
  styleUrls: ['./create-saving-plan.component.css'],
})
export class CreateSavingPlanComponent {
  savingForm: FormGroup;
  incomes: CreateIncomeDTO[] | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    // private dialogRef: MatDialogRef<CreateBudgetComponent>,
    private sharedService: SharedService
  ) {
    this.savingForm = this.formBuilder.group({
      goal: ['', Validators.required],
      goal_amount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.getIncomes().subscribe((result) => {
      this.incomes = result.incomes;
    });
  }

  onSubmit() {
    if (this.savingForm.valid) {
      const savingData = this.savingForm.value;
      this.authService.createSaving$(savingData).subscribe(() => {
        this.savingForm.reset();
        // this.dialogRef.close();
      });
    }
  }
}
