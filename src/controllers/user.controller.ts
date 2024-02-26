import {
  Count,
  CountSchema, DataObject,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  requestBody,
  response,
} from '@loopback/rest';
import {
  Credentials,
  QAUserService,
  TokenServiceBindings,
  UserServiceBindings
} from "@/components/jwt-authentication";
import {inject} from "@loopback/core";
import {authenticate, TokenService} from '@loopback/authentication';
import {SecurityBindings, UserProfile} from "@loopback/security";
import {UserSignupRequest, User, UserLoginResponse, UserLoginRequest} from '@/models';
import {UserCredentialsRepository, UserRepository} from '@/repositories';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: QAUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository)
    public userRepository : UserRepository,
    @repository(UserCredentialsRepository)
    public userCredentialsRepository : UserCredentialsRepository,
  ) {}

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserLoginResponse)
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserLoginRequest)
        },
      },
    }) credentials: Credentials,
  ): Promise<DataObject<UserLoginResponse>> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile: UserProfile = this.userService.convertToUserProfile(user);
    const id = await this.jwtService.generateToken(userProfile);
    return { token: id, userId: user.id };
  }

  @post('/users/signup')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async signup(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserSignupRequest, {
          title: 'NewUser',
          exclude: ['id'],
        }),
      },
    },
  }) credentials: Credentials) {
    const hashedPassword = await this.hashPassword(
      credentials.password,
      10
    );
    const savedUser = await this.userRepository.create(
      _.pick(credentials, ['email', 'username'])
    );
    await this.userCredentialsRepository.create({
      password: hashedPassword,
      userId: savedUser.id,
      id: `${ savedUser.id }`
    });
    return savedUser;
  }

  async hashPassword(password: string, rounds: number): Promise<string> {
    const salt = await genSalt(rounds);
    return hash(password, salt);
  }

  @authenticate('jwt')
  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @authenticate('jwt')
  @get('/users/{id}')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: number,
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @authenticate('jwt')
  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }
}
