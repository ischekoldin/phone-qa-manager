import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {PostgresDataSource} from '@/datasources';
import {Phone, PhoneBrand, PhoneModel, PhoneRelations, User} from '@/models';
import {UserRepository, PhoneBrandRepository, PhoneModelRepository} from '@/repositories';



export class PhoneRepository extends DefaultCrudRepository<
  Phone,
  typeof Phone.prototype.id,
  PhoneRelations
> {
  public readonly brand: BelongsToAccessor<
    PhoneBrand,
    typeof Phone.prototype.brandId
  >;
  public readonly reservedBy: BelongsToAccessor<
    User,
    typeof Phone.prototype.reservedById
  >;
  public readonly model: BelongsToAccessor<
    PhoneModel,
    typeof Phone.prototype.modelId
  >;
  constructor(
    @inject('datasources.postgres')
      dataSource: PostgresDataSource,
    @repository.getter('PhoneBrandRepository')
      phoneBrandRepositoryGetter: Getter<PhoneBrandRepository>,
    @repository.getter('PhoneModelRepository')
      phoneModelRepositoryGetter: Getter<PhoneModelRepository>,
    @repository.getter('UserRepository')
      userRepositoryGetter: Getter<UserRepository>
  ) {
    super(Phone, dataSource);
    this.brand = this.createBelongsToAccessorFor(
      'brand',
      phoneBrandRepositoryGetter,
    );
    this.registerInclusionResolver(
      'brand',
      this.brand.inclusionResolver
    );
    this.model = this.createBelongsToAccessorFor(
      'model',
      phoneModelRepositoryGetter,
    );
    this.registerInclusionResolver(
      'model',
      this.model.inclusionResolver
    );
    this.reservedBy = this.createBelongsToAccessorFor(
      'reservedBy',
      userRepositoryGetter,
    );
    this.registerInclusionResolver(
      'reservedBy',
      this.reservedBy.inclusionResolver
    );
  }
}
