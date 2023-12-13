import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeContainerComponent } from './home-container/home-container.component';
import { DashboardComponent } from './home-container/home-page/dashboard/dashboard.component';
import { BudgetComponent } from './home-container/home-page/budget/budget.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CreateExpenseComponent } from './home-container/home-page/expense/create-expense/create-expense.component';
import { ExpenseComponent } from './home-container/home-page/expense/expense.component';
import { CreateBillComponent } from './home-container/home-page/bills/create-bill/create-bill.component';
import { BillsComponent } from './home-container/home-page/bills/bills.component';
import { CreateIncomeComponent } from './home-container/home-page/income/create-income/create-income.component';
import { IncomeComponent } from './home-container/home-page/income/income.component';
import { CreateSavingPlanComponent } from './home-container/home-page/saving-plan/create-saving-plan/create-saving-plan.component';
import { SavingPlanComponent } from './home-container/home-page/saving-plan/saving-plan.component';
import { ProfileSettingsComponent } from './user/profile-settings/profile-settings.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'home',
    component: HomeContainerComponent,
    children: [
      // Redirect the default route of 'home' to 'dashboard'
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'budget', component: BudgetComponent },
      { path: 'expenses', component: ExpenseComponent },
      { path: 'bills', component: BillsComponent },
      { path: 'income', component: IncomeComponent },
      { path: 'savings', component: SavingPlanComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
