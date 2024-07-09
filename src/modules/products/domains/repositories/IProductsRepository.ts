import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';

export interface IProductsRepository {
  generate(data: ICreateProduct): Promise<IProduct>;
  update(product: IProduct): Promise<void>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
  delete(product: IProduct): Promise<void>;
  findAll(): Promise<IProduct[]>;
  findById(id: string): Promise<IProduct | null>;
  findByName(name: string): Promise<IProduct | null>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
}
