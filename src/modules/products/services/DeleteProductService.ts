import { AppError } from '@shared/errors/AppError';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
}

export class DeleteProductsService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await ProductsRepository.findOneBy({ id });

    if (!product) {
      throw new AppError('Product not found.');
    }

    await ProductsRepository.remove(product);
  }
}
