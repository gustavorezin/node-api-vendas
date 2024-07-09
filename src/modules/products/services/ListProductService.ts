import { redisCache } from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domains/models/IProduct';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';

@injectable()
export class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute() {
    let products = await redisCache.recover<IProduct[]>(
      'api-vendas-PRODUCTS_LIST'
    );

    if (!products) {
      products = await this.productsRepository.findAll();
      await redisCache.save('api-vendas-PRODUCTS_LIST', products);
    }

    return products;
  }
}
