import { Product } from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

export class ListProductsService {
  public async execute(): Promise<Product[]> {
    const products = await ProductsRepository.find();
    return products;
  }
}
