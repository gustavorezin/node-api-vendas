import { Product } from '@modules/products/typeorm/entities/Product';
import { Repository } from 'typeorm';

export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | null> {
    const product = this.findOne({
      where: { name }
    });

    return product;
  }
}
