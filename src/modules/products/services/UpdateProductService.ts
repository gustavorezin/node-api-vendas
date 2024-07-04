import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { Product } from '../typeorm/entities/Product';
import { RedisCache } from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProductsService {
  public async execute({
    id,
    name,
    price,
    quantity
  }: IRequest): Promise<Product> {
    const redisCache = new RedisCache();
    const product = await ProductsRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await ProductsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    await redisCache.invalidate('api-vendas-PRODUCTS_LIST');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductsRepository.save(product);

    return product;
  }
}
