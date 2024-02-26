import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '@/datasources';
import {PhoneBrand, PhoneBrandRelations} from '@/models';

export class PhoneBrandRepository extends DefaultCrudRepository<
  PhoneBrand,
  typeof PhoneBrand.prototype.id,
  PhoneBrandRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(PhoneBrand, dataSource);
  }
}
