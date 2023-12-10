import { CreateIncomeDTO } from './income.dto';

export interface CreateSavingDTO {
  goal: string;
  goal_amount: number;
  incomeId: string;
  income: CreateIncomeDTO;
  total: number;
  showInlineInput?: boolean;
  id: string;
}

export interface AddSavingDTO {
  savingId: string;
  saving: CreateSavingDTO;
  amount: number;
  incomeId: string;
  income: CreateIncomeDTO;
}
