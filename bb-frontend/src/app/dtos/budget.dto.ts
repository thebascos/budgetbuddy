import { CreateIncomeDTO } from './income.dto';

export interface BudgetDTO {
  description: string;
  amount: number;
  id: string;
  incomeId: string;
  income: CreateIncomeDTO;
}
