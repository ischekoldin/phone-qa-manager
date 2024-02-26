import {belongsTo, Entity, model, property} from '@loopback/repository';
import {PhoneBrand} from '@/models';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'ph_qa_manager', table: 'phone_model'},
    foreignKeys: {
      fkPhoneModelPhoneBrandId: {
        name: 'fk_phone_model_phone_brand_id',
        entity: 'PhoneBrand',
        entityKey: 'id',
        foreignKey: 'phone_brand_id',
      },
    }
  }
})
export class PhoneModel extends Entity {
  @property({
    type: 'number',
    required: true,
    jsonSchema: {nullable: false},
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'serial', nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {nullable: false},
    postgresql: {columnName: 'name', dataType: 'character varying', nullable: 'NO', dataLength: 100},
  })
  name: string;

  @belongsTo(
    () => PhoneBrand,
    { name: 'brand' },
    {
      type: 'number',
      required: true,
      jsonSchema: {nullable: false},
      postgresql: {columnName: 'phone_brand_id', dataType: 'integer', nullable: 'NO'},
    })
  phoneBrandId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PhoneModel>) {
    super(data);
  }
}

export interface PhoneModelRelations {
  // describe navigational properties here
}

export type PhoneModelWithRelations = PhoneModel & PhoneModelRelations;
