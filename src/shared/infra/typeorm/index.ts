import { DataSource } from 'typeorm';
import { CreateProducts1719504639312 } from './migrations/1719504639312-CreateProducts';
import { Product } from '@modules/products/typeorm/entities/Product';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  // /src/modules/**/typeorm/entities/*.ts -> nao funciona pois deve ser feito build antes (.js)
  entities: [Product],
  // /src/shared/infra/typeorm/migrations/*.ts -> nao funciona pois deve ser feito build antes (.js)
  migrations: [CreateProducts1719504639312]
});
