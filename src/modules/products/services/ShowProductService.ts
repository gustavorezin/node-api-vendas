import { AppError } from '@shared/errors/AppError';
import { Product } from '../infra/typeorm/entities/Product';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

export class ShowProductsService {
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await ProductsRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}
