import { dataSource } from '@shared/infra/typeorm';
import { Product } from '../entities/Product';

export const ProductsRepository = dataSource.getRepository(Product).extend({
  findByName(name: string) {
    return this.createQueryBuilder('product')
      .where('product.name = :name', {
        name
      })
      .getOne();
  }
});
