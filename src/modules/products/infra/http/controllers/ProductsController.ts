import { Request, Response } from 'express';
import { CreateProductsService } from '@modules/products/services/CreateProductService';
import { DeleteProductsService } from '@modules/products/services/DeleteProductService';
import { ListProductsService } from '@modules/products/services/ListProductService';
import { ShowProductsService } from '@modules/products/services/ShowProductService';
import { UpdateProductsService } from '@modules/products/services/UpdateProductService';
import { container } from 'tsyringe';

export class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductsService);
    const products = await listProducts.execute();
    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProduct = container.resolve(ShowProductsService);
    const product = await showProduct.execute({ id });
    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProduct = container.resolve(CreateProductsService);
    const product = await createProduct.execute({ name, price, quantity });
    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;
    const updateProduct = container.resolve(UpdateProductsService);
    const product = await updateProduct.execute({ id, name, price, quantity });
    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProduct = container.resolve(DeleteProductsService);
    await deleteProduct.execute({ id });
    // 204 = No content
    return response.status(204).json();
  }
}
