// import {Entity, model, property} from '@loopback/repository';
//
// @model({
//   settings: {idInjection: false, postgresql: {schema: 'public', table: 'patient'}}
// })
// export class Patient extends Entity {
//   @property({
//     type: 'number',
//     jsonSchema: {nullable: false},
//     id: 1,
//     scale: 0,
//     postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO', generated: undefined},
//   })
//   id: number;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'fio', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   fio?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'addr', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   addr?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'email', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   email?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'phone', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   phone?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'birthdate', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   birthdate?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'age', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   age?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'gender', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   gender?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'polic', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   polic?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'snils', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   snils?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'nummk', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   nummk?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'uid', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   uid?: string;
//
//   @property({
//     type: 'number',
//     jsonSchema: {nullable: true},
//     scale: 0,
//     postgresql: {columnName: 'agree', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES', generated: undefined},
//   })
//   agree?: number;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'fias_aoguid', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   fias_aoguid?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'fias_houseguid', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   fias_houseguid?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'doc_series', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   doc_series?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'doc_number', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   doc_number?: string;
//
//   @property({
//     type: 'date',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'doc_date', dataType: 'date', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   doc_date?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'doc_issuer', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   doc_issuer?: string;
//
//   @property({
//     type: 'number',
//     jsonSchema: {nullable: true},
//     scale: 0,
//     postgresql: {columnName: 'doctype', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES', generated: undefined},
//   })
//   doctype?: number;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'agreedate', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   agreedate?: string;
//
//   @property({
//     type: 'string',
//     jsonSchema: {nullable: true},
//     postgresql: {columnName: 'userstring', dataType: 'character varying', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'YES', generated: undefined},
//   })
//   userString?: string;
//
//   // Define well-known properties here
//
//   // Indexer property to allow additional data
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [prop: string]: any;
//
//   constructor(data?: Partial<Patient>) {
//     super(data);
//   }
// }
//
// export interface PatientRelations {
//   // describe navigational properties here
// }
//
// export type PatientWithRelations = Patient & PatientRelations;
