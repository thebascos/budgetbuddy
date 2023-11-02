import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeContainerComponent } from './home-container/home-container.component';
import { DashboardComponent } from './home-container/home-page/dashboard/dashboard.component';
import { BudgetComponent } from './home-container/home-page/budget/budget.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { CreateExpenseComponent } from './home-container/home-page/expense/create-expense/create-expense.component';

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
      { path: 'expenses', component: CreateExpenseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
