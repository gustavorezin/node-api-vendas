import { AppError } from '@shared/errors/AppError';
import { OrdersRepository } from '../infra/typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

export class ShowOrderService {
  public async execute({ id }: IRequest) {
    const order = await OrdersRepository.findById(id);
    if (!order) {
      throw new AppError('Order not found.');
    }
    return order;
  }
}
