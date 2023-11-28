import { Pipe, PipeTransform } from '@angular/core';
import { CreateBillDTO } from '../dtos/bill.dto';

@Pipe({
  name: 'billFilter',
})
export class BillFilterPipe implements PipeTransform {
  transform(
    bills: CreateBillDTO[] | undefined,
    showUnpaid: boolean,
    showPaid: boolean
  ): CreateBillDTO[] | undefined {
    if (!bills) {
      return undefined;
    }

    // Show only unpaid bills
    if (showUnpaid && !showPaid) {
      return bills.filter((bill) => !bill.isPaid);
    }

    // Show only paid bills
    if (!showUnpaid && showPaid) {
      return bills.filter((bill) => bill.isPaid);
    }

    // Show both paid and unpaid bills
    return bills;
  }
}
