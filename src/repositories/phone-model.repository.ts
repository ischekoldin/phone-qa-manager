import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PostgresDataSource} from '@/datasources';
import {PhoneBrand, PhoneModel, PhoneModelRelations} from '@/models';
import {PhoneBrandRepository} from '@/repositories/phone-brand.repository';

export class PhoneModelRepository extends DefaultCrudRepository<
  PhoneModel,
  typeof PhoneModel.prototype.id,
  PhoneModelRelations
> {
  public readonly brand: BelongsToAccessor<
    PhoneBrand,
    typeof PhoneModel.prototype.id
  >;
  constructor(
    @inject('datasources.postgres')
      dataSource: PostgresDataSource,
    @repository.getter('PhoneBrandRepository')
      phoneBrandRepositoryGetter: Getter<PhoneBrandRepository>
  ) {
    super(PhoneModel, dataSource);
    this.brand = this.createBelongsToAccessorFor(
      'brand',
      phoneBrandRepositoryGetter,
    );
    this.registerInclusionResolver('brand', this.brand.inclusionResolver);
  }
}
