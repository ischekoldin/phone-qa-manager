import {Model, model, property} from '@loopback/repository';

@model()
export class PhoneReserveReturnRequest extends Model {
  @property()
  id: number;
}