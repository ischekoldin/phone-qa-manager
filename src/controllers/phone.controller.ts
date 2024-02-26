import {
  Filter,
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
  response, patch, requestBody,
} from '@loopback/rest';
import {Phone, PhoneReserveReturnRequest} from '@/models';
import {PhoneRepository} from '@/repositories';
import {authenticate} from '@loopback/authentication';
import {PhoneService} from '@/services';
import {inject} from '@loopback/core';

@authenticate('jwt')
export class PhoneController {
  constructor(
    @repository(PhoneRepository)
    public phoneRepository : PhoneRepository,
    @inject('services.PhoneService')
    public phoneService: PhoneService
  ) {}

  @get('/phones')
  @response(200, {
    description: 'Array of Phone model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Phone, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Phone) filter?: Filter<Phone>,
  ): Promise<Phone[]> {
    return this.phoneRepository.find(filter);
  }

  @get('/phones/{id}')
  @response(200, {
    description: 'Phone model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Phone, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Phone, {exclude: 'where'}) filter?: FilterExcludingWhere<Phone>
  ): Promise<Phone> {
    return this.phoneRepository.findById(id, filter);
  }

  @get('/phones/list-available')
  @response(200, {
    description: 'An array of phones available for reservation',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Phone, { includeRelations: true }),
        },
      },
    },
  })
  async listAvailable(): Promise<Phone[]> {
    return this.phoneService.listAvailable();
  }

  @get('/phones/list-reserved')
  @response(200, {
    description: 'An array of phones unavailable for reservation',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Phone, {includeRelations: true}),
        },
      },
    },
  })
  async listReserved(): Promise<Phone[]> {
    return this.phoneService.listReserved();
  }

  @patch('/phones/reserve')
  @response(200, {
    description: 'An updated phone record',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Phone)
      }
    },
  })
  async reserve(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhoneReserveReturnRequest, {partial: true}),
        },
      },
    })
      phoneReserveRequest: PhoneReserveReturnRequest,
  ): Promise<Phone> {
    return this.phoneService.reserve(phoneReserveRequest.id);
  }

  @patch('/phones/return')
  @response(200, {
    description: 'An updated phone record',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Phone)
      }
    },
  })
  async return(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PhoneReserveReturnRequest, {partial: true}),
        },
      },
    })
      phoneReserveRequest: PhoneReserveReturnRequest,
  ): Promise<Phone> {
    return this.phoneService.return(phoneReserveRequest.id);
  }
}


