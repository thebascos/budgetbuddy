import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateBudgetComponent } from './create-budget/create-budget.component';
import { AuthService } from '../../../services/auth.service';
import { BudgetDTO } from '../../../dtos/budget.dto';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  budgets: BudgetDTO[] | undefined;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getBudgets().subscribe((budgets) => {
      this.budgets = budgets;
    });
  }

  openCreateBudgetDialog(): void {
    const dialogRef = this.dialog.open(CreateBudgetComponent, {});
  }
}
