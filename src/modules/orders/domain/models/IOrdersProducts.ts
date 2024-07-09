import { IProduct } from '@modules/products/domains/models/IProduct';
import { IOrder } from './IOrder';

export interface IOrdersProducts {
  id: string;
  order: IOrder;
  product: IProduct;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
