import {Model, model, property} from "@loopback/repository";

@model()
export class UserLoginResponse extends Model {
  @property() id: string
  @property() userId: string
}
