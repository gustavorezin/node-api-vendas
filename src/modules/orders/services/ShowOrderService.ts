import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

interface IRequest {
  id: string;
}

@injectable()
export class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  public async execute({ id }: IRequest) {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new AppError('Order not found.');
    }
    return order;
  }
}
