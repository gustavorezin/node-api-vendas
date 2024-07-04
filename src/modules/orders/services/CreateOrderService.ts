import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export class CreateOrderService {
  public async execute({ customer_id, products }: IRequest) {
    // Verifica se cliente existe
    const customer = await CustomersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Could not find any customer with the given id.');
    }

    // Verifica se lista de produtos existe
    const existsProducts = await ProductsRepository.findAllByIds(products);

    if (existsProducts.length === 0) {
      throw new AppError('Could not find any products with the given ids.');
    }

    // Mapeia produtos existentes por ID para acesso mais rápido
    const existsProductsMap = new Map(
      existsProducts.map(product => [product.id, product])
    );

    // Verifica produtos inexistentes
    const checkInexistentProducts = products.filter(
      product => !existsProductsMap.has(product.id)
    );

    if (checkInexistentProducts.length > 0) {
      throw new AppError(
        `Could not find product with id ${checkInexistentProducts[0].id}.`
      );
    }

    // Verifica quantidade disponível dos produtos
    const quantityAvailable = products.filter(product => {
      const foundProduct = existsProductsMap.get(product.id);
      return foundProduct && foundProduct.quantity < product.quantity;
    });

    if (quantityAvailable.length > 0) {
      throw new AppError(
        `Insufficient quantity for product with id ${quantityAvailable[0].id}.`
      );
    }

    // Monta a lista de produtos completa com preço
    const serializedProducts = products.map(product => {
      const foundProduct = existsProductsMap.get(product.id)!;
      return {
        product_id: product.id,
        quantity: product.quantity,
        price: foundProduct.price
      };
    });

    // Cria a ordem
    const order = await OrdersRepository.createOrder({
      customer,
      products: serializedProducts
    });

    // Atualiza quantidade dos produtos no banco de dados
    const updatedProductQuantity = serializedProducts.map(product => ({
      id: product.product_id,
      quantity:
        existsProductsMap.get(product.product_id)!.quantity - product.quantity
    }));

    await ProductsRepository.save(updatedProductQuantity);

    return order;
  }
}
