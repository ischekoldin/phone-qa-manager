import {BindingScope, inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {PhoneRepository} from '@/repositories';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';

@injectable({scope: BindingScope.TRANSIENT})
export class PhoneService {
  constructor(
    @repository(PhoneRepository)
    private phoneRepository: PhoneRepository,
    @inject(SecurityBindings.USER, { optional: true })
    private user: UserProfile,
  ) {}

  async listAvailable() {
    const errFailedToListAvailablePhones = (msg: string) =>
      `failed to list available phones: ${ msg }`;

    try {
      return await this.phoneRepository.find({
        include: ['brand', 'model'],
        where: { reserved: false }
      });
    } catch (e) {
      throw new Error(errFailedToListAvailablePhones(JSON.stringify(e)));
    }
  }

  async listReserved() {
    const errFailedToListReservedPhones = (msg: string) =>
      `failed to list reserved phones: ${ msg }`;

    try {
      return await this.phoneRepository.find({
        include: ['brand', 'model', 'reservedBy'],
        where: { reserved: true }
      });
    } catch (e) {
      throw new Error(errFailedToListReservedPhones(JSON.stringify(e)));
    }
  }

  async reserve(id: number) {
    let updated = { count: 0 };

    const errFailedToReserve = (msg: string) =>
      `failed to reserve the phone with id ${ id }: ${ msg }`;
    const errInvalidIdOrReserved =
      `id is invalid or the phone is already reserved`;

    try {
      updated = await this.phoneRepository.updateAll( {
        reserved: true,
        reservedById: parseInt(this.user[securityId]),
        reservedTs: new Date().toISOString()
      }, { reserved: false, id });
    } catch (e) {
      throw new Error(errFailedToReserve(JSON.stringify(e)));
    }

    if (updated.count) {
      return this.phoneRepository.findById(id,
        { include: ['brand', 'model', 'reservedBy'] }
      );
    }

    throw new Error(errFailedToReserve(errInvalidIdOrReserved));
  }

  async return(id: number) {
    let updated = { count: 0 };

    const errFailedToReturn = (msg: string) =>
      `failed to return the phone with id ${ id }: ${ msg }`;
    const errInvalidIdOrNotReserved =
      `id is invalid or the phone is not reserved`;

    try {
      updated = await this.phoneRepository.updateAll({
        reserved: false,
        reservedById: <number><unknown>null,
        reservedTs: <string><unknown>null
      }, { reserved: true, id });
    } catch (e) {
      throw new Error(errFailedToReturn(JSON.stringify(e)));
    }

    if (updated.count) {
      return this.phoneRepository.findById(id,
        { include: ['brand', 'model'] }
      );
    }

    throw new Error(errFailedToReturn(errInvalidIdOrNotReserved));
  }
}
