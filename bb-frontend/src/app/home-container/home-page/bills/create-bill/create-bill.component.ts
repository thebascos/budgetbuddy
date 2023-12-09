import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Billers } from 'src/app/dtos/bill.dto';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateBillComponent {
  billForm: FormGroup;
  listOfBillers: string[] = Object.values(Billers);
  days: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 29, 29, 30, 31,
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<CreateBillComponent>,
    private sharedService: SharedService
  ) {
    this.billForm = this.formBuilder.group({
      biller: ['', Validators.required],
      amount: ['', Validators.required],
      dueDay: [Validators.required],
    });
  }

  onSubmit() {
    if (this.billForm.valid) {
      const billData = this.billForm.value;
      // Convert dueDay to a number
      const numericDueDay = parseInt(billData.dueDay.toString(), 10);
      billData.dueDay = numericDueDay;
      this.authService.createBill$(billData).subscribe(() => {
        this.billForm.reset();
        this.dialogRef.close();
      });
    }
  }
}
