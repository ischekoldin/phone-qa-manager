import {inject} from '@loopback/core';
import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {UserServiceBindings} from '@/components/jwt-authentication';
import {UserCredentials, UserCredentialsRelations} from '@/models';

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.id,
  UserCredentialsRelations
> {
  constructor(
    @inject(`datasources.receipt`)
      dataSource: juggler.DataSource,
  ) {
    super(UserCredentials, dataSource);
  }
}