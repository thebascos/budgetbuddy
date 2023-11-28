import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBillDTO } from 'src/app/dtos/bill.dto';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { DatePipe } from '@angular/common';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { BillFilterPipe } from 'src/app/pipe/bill-filter.pipe';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
})
export class BillsComponent implements OnInit {
  bills: CreateBillDTO[] | undefined;
  errorMessage: string | undefined;
  showUnpaid: boolean = true;
  showPaid: boolean = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private sharedService: SharedService,
    private datePipe: DatePipe,
    private billStatusFilterPipe: BillFilterPipe
  ) {}

  ngOnInit(): void {
    this.authService.getBills().subscribe((bills) => {
      this.bills = bills;
    });
  }

  formatDueDate(dueDay: number): string {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1; // Note: Month is zero-based

    if (currentDate.getDate() > dueDay) {
      currentMonth += 1;
      if (currentMonth === 13) {
        currentMonth = 1;
        currentYear += 1;
      }
    }

    return `${this.getMonthName(currentMonth)} ${dueDay} ${currentYear}`;
  }

  getMonthName(month: number): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[month - 1];
  }

  openCreateBillDialog(): void {
    const dialogRef = this.dialog.open(CreateBillComponent, {
      // width: '400px',
    });
  }
}
