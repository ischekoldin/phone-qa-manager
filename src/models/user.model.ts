import {Entity, hasOne, model, property} from "@loopback/repository";
import {UserCredentials} from "@/models/user-credentials.model";

@model({
  settings: { postgresql: { schema: 'ph_qa_manager', table: 'user' }}
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    postgresql: {columnName: 'id', dataType: 'serial', nullable: 'NO'},
  })
  id: number;

  @property({
    type: 'string',
  })
  username: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
