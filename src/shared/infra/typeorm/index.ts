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
  entities: [Product],
  migrations: [CreateProducts1719504639312]
});
