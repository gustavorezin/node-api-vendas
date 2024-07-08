import { redisCache } from '@shared/cache/RedisCache';
import { Product } from '../infra/typeorm/entities/Product';
import { ProductsRepository } from '../infra/typeorm/repositories/ProductsRepository';

export class ListProductsService {
  public async execute(): Promise<Product[]> {
    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCTS_LIST'
    );

    if (!products) {
      products = await ProductsRepository.find();
      await redisCache.save('api-vendas-PRODUCTS_LIST', products);
    }

    return products;
  }
}
