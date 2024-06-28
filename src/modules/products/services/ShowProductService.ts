import { AppError } from '@shared/errors/AppError';
import { Product } from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

export class ShowProductsService {
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await ProductsRepository.findOne({ where: { id } });

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}
