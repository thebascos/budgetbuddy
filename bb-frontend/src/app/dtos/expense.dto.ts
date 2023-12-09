<<<<<<< HEAD
<<<<<<< HEAD
import { Interaction } from 'chart.js';
=======
>>>>>>> 4d0372f (add expenses)
=======
import { Interaction } from 'chart.js';
>>>>>>> c15859e (continue)
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
