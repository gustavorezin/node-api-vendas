import { AppError } from '@shared/errors/AppError';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import { RedisCache } from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

export class DeleteProductsService {
  public async execute({ id }: IRequest): Promise<void> {
    const redisCache = new RedisCache();
    const product = await ProductsRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.');
    }

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    await ProductsRepository.remove(product);
  }
}
