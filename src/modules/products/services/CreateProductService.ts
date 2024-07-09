import { redisCache } from '@shared/cache/RedisCache';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateProduct } from '../domains/models/ICreateProduct';
import { IProductsRepository } from '../domains/repositories/IProductsRepository';

@injectable()
export class CreateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  public async execute({ name, price, quantity }: ICreateProduct) {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    const product = await this.productsRepository.generate({
      name,
      price,
      quantity
    });

    return product;
  }
}
