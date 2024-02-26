import {belongsTo, Entity, model, property} from '@loopback/repository';
import {PhoneBrand} from '@/models/phone-brand.model';
import {User} from '@/models/user.model';
import {PhoneModel} from '@/models/phone-model.model';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'ph_qa_manager', table: 'phone' },
    foreignKeys: {
      fkPhoneBrandId: {
        name: 'fk_phone_brand_id',
        entity: 'PhoneBrand',
        entityKey: 'id',
        foreignKey: 'brand_id',
      },
      fkPhoneModelId: {
        name: 'fk_phone_model_id',
        entity: 'PhoneModel',
        entityKey: 'id',
        foreignKey: 'model_id',
      },
      fkPhoneReservedById: {
        name: 'fk_phone_reserved_by_id',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'reserved_by_id',
      },
    },
  }
})
export class Phone extends Entity {

  @belongsTo(
    () => PhoneBrand,
    { name: 'brand' },
    {
      type: 'number',
      required: true,
      jsonSchema: {nullable: false},
      scale: 0,
      postgresql: {columnName: 'brand_id', dataType: 'integer', nullable: 'NO'}
    })
  brandId: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {nullable: false},
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'serial', nullable: 'NO'},
  })
  id: number;

  @belongsTo(
    () => User,
    { name: 'reservedBy' },
    {
      type: 'number',
      jsonSchema: {nullable: true},
      scale: 0,
      postgresql: {columnName: 'reserved_by_id', dataType: 'integer', nullable: 'YES'},
    })
  reservedById: number;

  @property({
    type: 'boolean',
    default: false,
    jsonSchema: {nullable: false},
    postgresql: {columnName: 'reserved', dataType: 'boolean', nullable: 'NO'},
  })
  reserved: boolean;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    postgresql: {columnName: 'reserved_ts', dataType: 'timestamp without time zone', nullable: 'YES'},
  })
  reservedTs?: string;

  @belongsTo(
    () => PhoneModel,
    { name: 'model' },
    {
      type: 'number',
      jsonSchema: {nullable: false},
      scale: 0,
      postgresql: {columnName: 'model_id', dataType: 'integer', nullable: 'No'},
    })
  modelId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Phone>) {
    super(data);
  }
}

export interface PhoneRelations {
  // describe navigational properties here
}

export type PhoneWithRelations = Phone & PhoneRelations;
