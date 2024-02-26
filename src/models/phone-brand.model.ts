import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'ph_qa_manager', table: 'phone_brand'}}
})
export class PhoneBrand extends Entity {
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

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PhoneBrand>) {
    super(data);
  }
}

export interface PhoneBrandRelations {
  // describe navigational properties here
}

export type PhoneBrandWithRelations = PhoneBrand & PhoneBrandRelations;
