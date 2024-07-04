import { dataSource } from '@shared/infra/typeorm';
import { Product } from '../entities/Product';
import { In } from 'typeorm';

interface IFindProducts {
  id: string;
}

export const ProductsRepository = dataSource.getRepository(Product).extend({
  findByName(name: string) {
    return this.findOneBy({
      name
    });
  },
  findAllByIds(products: IFindProducts[]) {
    const productIds = products.map(product => product.id);
    return this.findBy({
      id: In(productIds)
    });
  }
});
