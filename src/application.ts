import {AuthenticationComponent} from '@loopback/authentication';
import { AuthorizationComponent } from '@loopback/authorization';
import {
  JWTAuthenticationComponent, SECURITY_SCHEME_SPEC,
} from '@/components/jwt-authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {CrudRestComponent} from '@loopback/rest-crud';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {PostgresDataSource} from './datasources';
import {PhoneQASequence} from './sequence';
import {PhoneService} from '@/services';

export {ApplicationConfig};

export class PhoneQAManagerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.sequence(PhoneQASequence);
    this.addSecuritySpec();

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.component(RestExplorerComponent);
    this.component(CrudRestComponent);
    this.component(AuthenticationComponent);
    this.component(AuthorizationComponent);
    this.component(JWTAuthenticationComponent);
    this.dataSource(PostgresDataSource, 'postgres');
    this.bind('services.PhoneService').toClass(PhoneService);
  }

  addSecuritySpec(): void {
    this.api({
      openapi: '3.0.0',
      info: {
        title: 'Phone QA Manager API',
        version: require('.././package.json').version,
      },
      paths: {},
      components: { securitySchemes: SECURITY_SCHEME_SPEC },
      security: [
        {
          jwt: [],
        },
      ],
      servers: [{ url: '/' }],
    });
  }
}
