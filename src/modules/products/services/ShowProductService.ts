import { AppError } from '@shared/errors/AppError';
import { Product } from '../typeorm/entities/Product';
import { ProductRepository } from './../typeorm/repositories/ProductRepository';

interface IRequest {
  id: string;
}

export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await ProductRepository.findOne({ where: { id } });

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}
