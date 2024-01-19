export interface SaleRequest {
  customerName: string;
  customerLastName: string;
  customerPhoneNumber: string;
  customerEmail: string;
  customerAddress: string;
  customerCuit: string;
  templatesIds: number[];
  receiptPath: string
}
