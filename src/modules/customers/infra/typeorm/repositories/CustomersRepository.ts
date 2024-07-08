import { dataSource } from '@shared/infra/typeorm';
import { Customer } from '../entities/Customer';

export const CustomersRepository = dataSource.getRepository(Customer).extend({
  findByName(name: string) {
    return this.createQueryBuilder('customer')
      .where('customer.name = :name', {
        name
      })
      .getOne();
  },
  findById(id: string) {
    return this.createQueryBuilder('customer')
      .where('customer.id = :id', {
        id
      })
      .getOne();
  },
  findByEmail(email: string) {
    return this.createQueryBuilder('customer')
      .where('customer.email = :email', {
        email
      })
      .getOne();
  }
});
