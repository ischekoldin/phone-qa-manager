import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  host: 'localhost',
  port: '5432',
  password: 'postgres',
  "database": "postgres",
  "name": "postgres",
  "user": "postgres",
  "connector": "postgresql",
  "debug": true,
};

@lifeCycleObserver('datasource')
export class PostgresDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'reclpu';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postgres', {optional: true})
    dsConfig: Record<string, string|boolean|number> = config,
  ) {
    super(dsConfig);
  }
}
