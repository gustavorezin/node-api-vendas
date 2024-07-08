import { Request, Response } from 'express';
import { CreateProductsService } from '@modules/products/services/CreateProductService';
import { DeleteProductsService } from '@modules/products/services/DeleteProductService';
import { ListProductsService } from '@modules/products/services/ListProductService';
import { ShowProductsService } from '@modules/products/services/ShowProductService';
import { UpdateProductsService } from '@modules/products/services/UpdateProductService';

export class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductsService();
    const products = await listProducts.execute();
    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProduct = new ShowProductsService();
    const product = await showProduct.execute({ id });
    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProduct = new CreateProductsService();
    const product = await createProduct.execute({ name, price, quantity });
    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;
    const updateProduct = new UpdateProductsService();
    const product = await updateProduct.execute({ id, name, price, quantity });
    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProduct = new DeleteProductsService();
    await deleteProduct.execute({ id });
    return response.json([]);
  }
}
