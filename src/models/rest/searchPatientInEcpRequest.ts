import {Model, model, property} from "@loopback/repository";

@model()
export class SearchPatientInEcpRequest extends Model {
  @property() uid: number
  @property() lastname?: string
  @property() firstname?: string
  @property() middlename?: string
  @property() birthdate?: string
  @property() snils?: string
}
