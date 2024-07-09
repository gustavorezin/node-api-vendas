import { ICreateOrder } from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';

export interface IOrdersRepository {
  generate(data: ICreateOrder): Promise<IOrder>;
  findById(id: string): Promise<IOrder | null>;
}
