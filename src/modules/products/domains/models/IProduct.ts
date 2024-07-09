import { IOrdersProducts } from '@modules/orders/domain/models/IOrdersProducts';

export interface IProduct {
  id: string;
  orderProducts?: IOrdersProducts[];
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
