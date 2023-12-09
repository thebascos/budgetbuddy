import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateIncomeDTO } from 'src/app/dtos/income.dto';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { CreateIncomeComponent } from './create-income/create-income.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent {
  incomes: CreateIncomeDTO[] | undefined;
  totalIncomes: number = 0;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.authService.getIncomes().subscribe((result) => {
      this.incomes = result.incomes;
      this.totalIncomes = result.totalIncomes;
    });
  }

  openCreateBillDialog(): void {
    const dialogRef = this.dialog.open(CreateIncomeComponent, {
      width: '400px',
    });
  }
}
