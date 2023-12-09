export interface CreateIncomeDTO {
  source_account: SOURCE_ACCOUNTS;
  source: string;
  amount: number;
  userId: string;
  id: string;
}
export enum SOURCE_ACCOUNTS {
  BDO = 'BDO',
  BPI = 'BPI',
  MANUAL = 'MANUAL',
}
