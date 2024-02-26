import {model, property} from '@loopback/repository';

@model()
export class UserLoginRequest {
  @property()
  email: string;

  @property()
  password: string;
}