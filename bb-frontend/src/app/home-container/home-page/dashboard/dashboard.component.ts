import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { BudgetDTO } from 'src/app/dtos/budget.dto';
import { PieChartComponent } from 'src/app/graph/pie-chart/pie-chart.component';
import { DatePipe } from '@angular/common';
import { CreateBillDTO } from 'src/app/dtos/bill.dto';
import { AuthService } from 'src/app/services/auth.service';
import { getDate, getMonth, getYear } from 'date-fns'; // Import the necessary functions from date-fns

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  budgets: BudgetDTO[] | undefined;
  totalExpensesByBudget: { [key: string]: number } = {};
  bills: CreateBillDTO[] | undefined;

  @ViewChild(PieChartComponent) pieChartComponent!: PieChartComponent;

  constructor(
    private sharedService: SharedService,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadExpenses();
    this.loadBills();
  }

  updatePieChart(pieData: { label: string; data: number }[]): void {
    this.pieChartComponent.updateChart(pieData);
  }
  getTotalExpenses(): number {
    return Object.values(this.totalExpensesByBudget).reduce(
      (total, value) => total + value,
      0
    );
  }
  loadBills() {
    this.authService.getBills().subscribe((bills) => {
      this.bills = bills;
    });
  }
  filterBillsDueThisMonth() {
    const currentMonth = getMonth(new Date()) - 1;
    const currentYear = getYear(new Date());
    const currentDay = getDate(new Date());

    return this.bills?.filter((bill) => {
      return bill.dueDay > currentDay;
    });
  }

  loadExpenses() {
    const currentDate = new Date();
    const currentMonth = this.datePipe.transform(currentDate, 'MM');
    const currentYear = this.datePipe.transform(currentDate, 'yyyy');

    this.sharedService.getBudgets().subscribe((budgets) => {
      this.budgets = budgets;

      this.sharedService.getExpenses().subscribe((expenses) => {
        if (this.budgets && expenses) {
          const currentMonthExpenses = expenses.filter(
            (expense) =>
              this.datePipe.transform(expense.createdAt, 'MM') ===
                currentMonth &&
              this.datePipe.transform(expense.createdAt, 'yyyy') === currentYear
          );

          // Filter the budgets that have expenses for the current month
          const budgetsWithExpensesForCurrentMonth = this.budgets.filter(
            (budget) => {
              return currentMonthExpenses.some(
                (expense) => expense.budgetId === budget.id
              );
            }
          );

          // Calculate total expenses only for the filtered budgets
          for (const budget of budgetsWithExpensesForCurrentMonth) {
            const budgetId = budget.id;
            const budgetExpenses = currentMonthExpenses.filter(
              (expense) => expense.budgetId === budgetId
            );

            const totalExpense = budgetExpenses.reduce(
              (total, expense) => total + expense.amount,
              0
            );

            this.totalExpensesByBudget[budgetId] = totalExpense;
          }

          let pieData = budgetsWithExpensesForCurrentMonth.map((budget) => {
            const budgetExpenses = this.totalExpensesByBudget[budget.id] || 0;
            return {
              label: budget.description,
              data: budgetExpenses,
            };
          });

          // Check if pieChartComponent is defined before updating the chart
          if (this.pieChartComponent) {
            this.updatePieChart(pieData);
          }
        }
      });
    });
  }

  updatePieChart(pieData: { label: string; data: number }[]): void {
    this.pieChartComponent.updateChart(pieData);
  }
  getTotalExpenses(): number {
    return Object.values(this.totalExpensesByBudget).reduce(
      (total, value) => total + value,
      0
    );
  }
}
