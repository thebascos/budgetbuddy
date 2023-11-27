import { Pipe, PipeTransform } from '@angular/core';
import { ExpenseDTO } from '../dtos/expense.dto';

@Pipe({
  pure: false,
  name: 'budgetFilter',
})
export class BudgetFilterPipe implements PipeTransform {
  transform(
    expenses: ExpenseDTO[] | undefined,
    selectedBudgets: string[]
  ): ExpenseDTO[] | undefined {
    if (!expenses || expenses.length === 0 || selectedBudgets.length === 0) {
      return expenses;
    }

    // Filter expenses based on selected budget IDs
    return expenses.filter((expense) =>
      selectedBudgets.includes(expense.budgetId)
    );
  }
}
