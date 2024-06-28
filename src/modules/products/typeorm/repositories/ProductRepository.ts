import { Product } from '@modules/products/typeorm/entities/Product';
import { dataSource } from '@shared/infra/typeorm';

export const ProductRepository = dataSource.getRepository(Product).extend({
  findByName(name: string) {
    return this.createQueryBuilder('product')
      .where('product.name = :name', {
        name
      })
      .getOne();
  }
});
