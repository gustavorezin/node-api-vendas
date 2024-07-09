import { dataSource } from '@shared/infra/typeorm';
import { Product } from '../entities/Product';
import { In, Repository } from 'typeorm';
import { IProductsRepository } from '@modules/products/domains/repositories/IProductsRepository';
import { ICreateProduct } from '@modules/products/domains/models/ICreateProduct';
import { IProduct } from '@modules/products/domains/models/IProduct';
import { IUpdateStockProduct } from '@modules/products/domains/models/IUpdateStockProduct';

export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  async generate({ name, price, quantity }: ICreateProduct) {
    const product = this.repository.create({ name, price, quantity });
    await this.repository.save(product);
    return product;
  }

  async update(product: IProduct) {
    await this.repository.save(product);
  }

  async updateStock(products: IUpdateStockProduct[]) {
    await this.repository.save(products);
  }

  async delete(product: Product) {
    await this.repository.remove(product);
  }

  findAll() {
    return this.repository.find();
  }

  findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  findByName(name: string) {
    return this.repository.findOneBy({ name });
  }

  findAllByIds(products: IFindProducts[]) {
    const productIds = products.map(product => product.id);
    return this.repository.findBy({
      id: In(productIds)
    });
  }
}
