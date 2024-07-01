import { DataSource } from 'typeorm';

import { Product } from '../../../modules/products/typeorm/entities/Product';
import { User } from '../../../modules/users/typeorm/entities/User';
import { UserToken } from '../../../modules/users/typeorm/entities/UserToken';

import { CreateProducts1719504639312 } from './migrations/1719504639312-CreateProducts';
import { CreateUsers1719584811062 } from './migrations/1719584811062-CreateUsers';
import { CreateUserTokens1719847447398 } from './migrations/1719847447398-CreateUserTokens';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  // /src/modules/**/typeorm/entities/*.ts -> nao funciona pois deve ser feito build antes (.js)
  entities: [Product, User, UserToken],
  // /src/shared/infra/typeorm/migrations/*.ts -> nao funciona pois deve ser feito build antes (.js)
  migrations: [
    CreateProducts1719504639312,
    CreateUsers1719584811062,
    CreateUserTokens1719847447398
  ]
});
