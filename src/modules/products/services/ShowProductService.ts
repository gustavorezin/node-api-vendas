import { ProductRepository } from './../typeorm/repositories/ProductRepository';
import { Product } from '../typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne({ where: { id } });

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}
