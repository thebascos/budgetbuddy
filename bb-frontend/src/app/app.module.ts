import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeContainerComponent } from './home-container/home-container.component';
import { HomePageComponent } from './home-container/home-page/home-page.component';
import { DashboardComponent } from './home-container/home-page/dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetComponent } from './home-container/home-page/budget/budget.component';
import { CreateBudgetComponent } from './home-container/home-page/budget/create-budget/create-budget.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ExpenseComponent } from './home-container/home-page/expense/expense.component';
import { CreateExpenseComponent } from './home-container/home-page/expense/create-expense/create-expense.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { PieChartComponent } from './graph/pie-chart/pie-chart.component';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BudgetFilterPipe } from './pipe/budget-filter.pipe';
import { BillsComponent } from './home-container/home-page/bills/bills.component';
import { CreateBillComponent } from './home-container/home-page/bills/create-bill/create-bill.component';
import { BillFilterPipe } from './pipe/bill-filter.pipe';
import { IncomeComponent } from './home-container/home-page/income/income.component';
import { CreateIncomeComponent } from './home-container/home-page/income/create-income/create-income.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingPageComponent,
    LoginComponent,
    HomeContainerComponent,
    HomePageComponent,
    DashboardComponent,
    UserComponent,
    BudgetComponent,
    CreateBudgetComponent,
    FileUploadComponent,
    ExpenseComponent,
    CreateExpenseComponent,
    PieChartComponent,
    BudgetFilterPipe,
    BillsComponent,
    CreateBillComponent,
    BillFilterPipe,
    IncomeComponent,
    CreateIncomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    FormsModule,
  ],
  providers: [DatePipe, BillFilterPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
