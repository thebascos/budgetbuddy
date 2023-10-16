import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeContainerComponent } from './home-container/home-container.component';
import { DashboardComponent } from './home-container/dashboard/dashboard.component';
import { BudgetComponent } from './budget/budget.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
