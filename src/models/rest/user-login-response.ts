import {Model, model, property} from "@loopback/repository";

@model()
export class UserLoginResponse extends Model {
  @property() token: string
  @property() userId: number
}
