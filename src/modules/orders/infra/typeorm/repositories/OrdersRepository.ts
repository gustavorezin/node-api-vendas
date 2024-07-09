import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/Order';

export class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = dataSource.getRepository(Order);
  }

  async generate({ customer, products }: ICreateOrder) {
    const order = this.repository.create({
      customer,
      orderProducts: products
    });
    await this.repository.save(order);
    return order;
  }

  findById(id: string) {
    return this.repository.findOne({
      where: { id },
      relations: ['customer', 'orderProducts']
    });
  }
}
