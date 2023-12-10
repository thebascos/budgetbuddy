import { Interaction } from 'chart.js';
import { BudgetDTO } from './budget.dto';

export interface ExpenseDTO {
  description: string;
  amount: number;
  attachment: string | null;
  budgetId: string;
  budget: BudgetDTO;
  createdAt: Date;
  editing: boolean;
  id: string;
}
export interface EditExpenseDTO {
  description: string;
  amount: number;
  budgetId: string;
}

export interface FileData {
  fileName: string;
  fileUrl: string;
}
