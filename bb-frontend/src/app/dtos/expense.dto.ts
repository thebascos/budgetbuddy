import { BudgetDTO } from './budget.dto';

export interface ExpenseDTO {
  description: string;
  amount: number;
  attachment: string | null;
  budgetId: string;
  budget: BudgetDTO;
  createdAt: Date;
}
