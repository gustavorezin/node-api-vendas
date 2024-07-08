import { AppError } from '@shared/errors/AppError';
import { redisCache } from '@shared/cache/RedisCache';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { Product } from '../infra/typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProductsService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await ProductsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    const product = ProductsRepository.create({ name, price, quantity });
    await ProductsRepository.save(product);

    return product;
  }
}
