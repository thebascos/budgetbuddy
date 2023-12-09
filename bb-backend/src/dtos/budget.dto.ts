import { CreateIncomeDTO } from './income.dto';

export interface BudgetDTO {
  description: string;
  amount: number;
  incomeId: string;
  income: CreateIncomeDTO;
}
