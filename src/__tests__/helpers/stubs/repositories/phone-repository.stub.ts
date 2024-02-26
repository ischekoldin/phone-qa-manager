import {DataObject} from '@loopback/repository';
import {Phone} from '@/models';

export class PhoneRepositoryStub {
  entries: DataObject<Phone>[] = [
    {
      "brandId": 2,
      "id": 6,
      "reservedById": 4,
      "reserved": true,
      "reservedTs": "2024-02-26T03:33:57.378Z",
      "modelId": 3,
      "brand": {
        "id": 2,
        "name": "Motorola"
      },
      "reservedBy": {
        "id": 4,
        "username": "Test",
        "email": "demo@test.ru"
      },
      "model": {
        "id": 3,
        "name": "Nexus 6",
        "phoneBrandId": 2
      }
    },
    {
      "brandId": 3,
      "id": 7,
      "reservedById": <number><unknown>null,
      "reserved": false,
      "reservedTs": <string><unknown>null,
      "modelId": 4,
      "brand": {
        "id": 3,
        "name": "Oneplus"
      },
      "model": {
        "id": 4,
        "name": "9",
        "phoneBrandId": 3
      }
    }
  ]

  async find(filter: any) {
    return this.entries.filter(phone => phone.reserved === filter.where.reserved);
  }

  async findById(id: any) {
    return this.entries.filter(phone => phone.id === id).pop();
  }

  async updateAll(data: any, where: any) {
    const entryToUpdate = this.entries.find(entry => entry.id === where.id && entry.reserved === where.reserved)
    if (!entryToUpdate) {
      return { count: 0 }
    }
    //entryToUpdate = { ...entryToUpdate };
    for (const keyToUpdate of Object.entries(data)) {
      entryToUpdate[keyToUpdate[0]] = keyToUpdate[1]
    }
    return { count: 1 };
  }
}