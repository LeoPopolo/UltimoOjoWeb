import { ITemplate } from "./template";

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

export interface SaleResponse {
  id: number,
  customerName: string,
  customerLastName: string,
  customerPhoneNumber: string,
  customerEmail: string,
  customerAddress: string,
  customerCuit: string,
  isPaid: boolean,
  total: number,
  receiptPath: string,
  templates: ITemplate[]
}
