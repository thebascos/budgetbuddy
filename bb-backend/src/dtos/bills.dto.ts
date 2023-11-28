export interface CreateBillDTO {
  biller: Billers;
  amount: number;
  isPaid: boolean;
  dueDay: number;
}
export enum Billers {
  PLDT = 'PLDT',
  VECO = 'VECO',
}
