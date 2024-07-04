import { DataSource } from 'typeorm';

import { Product } from '../../../modules/products/typeorm/entities/Product';
import { User } from '../../../modules/users/typeorm/entities/User';
import { UserToken } from '../../../modules/users/typeorm/entities/UserToken';
import { Customer } from '../../../modules/customers/typeorm/entities/Customer';
import { Order } from '../../../modules/orders/typeorm/entities/Order';
import { OrdersProducts } from '../../../modules/orders/typeorm/entities/OrdersProducts';

import { CreateProducts1719504639312 } from './migrations/1719504639312-CreateProducts';
import { CreateUsers1719584811062 } from './migrations/1719584811062-CreateUsers';
import { CreateUserTokens1719847447398 } from './migrations/1719847447398-CreateUserTokens';
import { CreateCustomers1720009461773 } from './migrations/1720009461773-CreateCustomers';
import { CreateOrders1720017342987 } from './migrations/1720017342987-CreateOrders';
import { AddCustomerIdToOrders1720017527359 } from './migrations/1720017527359-AddCustomerIdToOrders';
import { CreateOrdersProducts1720017995107 } from './migrations/1720017995107-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1720018152130 } from './migrations/1720018152130-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1720018333378 } from './migrations/1720018333378-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  // /src/modules/**/typeorm/entities/*.ts -> nao funciona pois deve ser feito build antes (.js)
  entities: [Product, User, UserToken, Customer, Order, OrdersProducts],
  // /src/shared/infra/typeorm/migrations/*.ts -> nao funciona pois deve ser feito build antes (.js)
  migrations: [
    CreateProducts1719504639312,
    CreateUsers1719584811062,
    CreateUserTokens1719847447398,
    CreateCustomers1720009461773,
    CreateOrders1720017342987,
    AddCustomerIdToOrders1720017527359,
    CreateOrdersProducts1720017995107,
    AddOrderIdToOrdersProducts1720018152130,
    AddProductIdToOrdersProducts1720018333378
  ]
});
