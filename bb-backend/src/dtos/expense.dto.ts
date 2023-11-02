export interface ExpenseDTO {
  description: string;
  amount: number;
  attachment: string | null;
  budgetId: string;
}
