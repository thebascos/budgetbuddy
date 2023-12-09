export interface CreateBillDTO {
  biller: Billers | string;
  amount: number;
  isPaid: boolean;
  dueDay: number;
  id: string;
}
export enum Billers {
  PLDT = 'PLDT',
  VECO = 'VECO',
}
