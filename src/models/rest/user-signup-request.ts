import {model, property} from '@loopback/repository';
import {User} from '@/models';

@model()
export class UserSignupRequest extends User{
  @property({
    type: 'string',
    jsonSchema: {
      minLength: 8
    }
  })
  password: string;
}