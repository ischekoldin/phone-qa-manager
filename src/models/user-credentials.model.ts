import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    postgresql: { schema: 'ph_qa_manager', table: 'user_credentials' },
    foreignKeys: {
      fkUserCredentialsUserId: {
        name: 'fk_user_credentials_user_id',
        entity: 'User',
        entityKey: 'id',
        foreignKey: 'user_id',
      },
    },
  },
})
export class UserCredentials extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    postgresql: {columnName: 'id', nullable: 'NO'},
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    postgresql: {columnName: 'password', nullable: 'NO'},
  })
  password: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {columnName: 'user_id', nullable: 'NO'},
  })
  userId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserCredentials>) {
    super(data);
  }
}

export interface UserCredentialsRelations {
  // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials &
  UserCredentialsRelations;
