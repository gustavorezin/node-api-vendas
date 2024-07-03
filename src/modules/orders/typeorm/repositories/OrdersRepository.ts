import { Customer } from '@modules/customers/typeorm/entities/Customer';
import { dataSource } from '@shared/infra/typeorm';
import { Order } from '../entities/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

export const OrdersRepository = dataSource.getRepository(Order).extend({
  findById(id: string) {
    return this.findOne({
      where: {
        id
      },
      relations: ['customer', 'orderProducts']
    });
  },
  async createOrder({ customer, products }: IRequest) {
    const order = this.create({
      customer,
      orderProducts: products
    });
    await this.save(order);
    return order;
  }
});
