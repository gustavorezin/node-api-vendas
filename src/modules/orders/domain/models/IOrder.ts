import { ICustomer } from '@modules/customers/domain/models/ICustomer';

export interface IOrder {
  id: string;
  customer: ICustomer;
  orderProducts: ICreateOrderProducts[];
  created_at: Date;
  updated_at: Date;
}
