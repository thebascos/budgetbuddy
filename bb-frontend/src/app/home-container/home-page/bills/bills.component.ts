import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBillDTO } from 'src/app/dtos/bill.dto';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { DatePipe } from '@angular/common';
import { CreateBillComponent } from './create-bill/create-bill.component';
import { BillFilterPipe } from 'src/app/pipe/bill-filter.pipe';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { getDate, getMonth, getYear } from 'date-fns'; // Import the necessary functions from date-fns

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
  stripe!: Stripe;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private sharedService: SharedService,
    private datePipe: DatePipe,
    private billStatusFilterPipe: BillFilterPipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentDay = getDate(new Date());

    this.authService.getBills().subscribe((bills) => {
      this.bills = bills;
      if (currentDay === 1) {
        this.bills?.forEach((bill) => {
          this.authService.resetBill$(bill).subscribe(() => {});
        });
      }
    });

    loadStripe(
      'pk_test_51O8MpUKhul2DCYat03LTQjfjwG6y8bgmG6zWaO04usjwFkh2vF1qgtzjE1bLi27kbcINZwr6B19nlK8CEirVn3si00OipDTGbD'
    ).then((stripe) => {
      if (stripe) {
        this.stripe = stripe;
      }
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

  payForBill(bill: CreateBillDTO) {
    // Fetch the Checkout Session ID from your server
    this.authService.createCheckoutSession(bill).subscribe((response) => {
      const sessionId = response.checkoutSessionId;

      if (sessionId) {
        // Redirect to the Stripe-hosted payment page
        this.stripe
          .redirectToCheckout({
            sessionId: sessionId,
          })
          .then((result) => {
            if (result.error) {
              console.error('Stripe Checkout failed:', result.error.message);
            } else {
              this.router.navigate(['/home/bills']);
            }
          });
      } else {
        console.error('Checkout Session ID is not available.');
      }
    });
  }
}
