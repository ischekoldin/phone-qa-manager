import 'module-alias/register';
import {PhoneQAManagerApplication} from './application';
import {PhoneBrandRepository} from '@/repositories';
import {postgresConfig, PostgresDataSource} from '@/datasources';
import * as fs from 'fs';

async function bootstrapTable(
  repository: PhoneBrandRepository,
  name: string
) {
  const errFailedToBootstrap = (msg: string) =>
    `failed to bootstrap table ${ name }: ${ msg }`;
  const errTableQueryNotFound = `table query not found`

  const query = await fs.promises.readFile(`dist/models/migrations/${ name }.sql`);

  if (!query) {
    throw new Error(errFailedToBootstrap(errTableQueryNotFound));
  }

  try {
    await repository.execute(query.toString());
  } catch (e) {
    throw new Error(errFailedToBootstrap(JSON.stringify(e)))
  }
}

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new PhoneQAManagerApplication();
  await app.boot();
  await app.migrateSchema({
    existingSchema,
    models: ['User', 'UserCredentials', 'PhoneBrand', 'PhoneModel', 'Phone']
  });

  const repository = new PhoneBrandRepository(
    new PostgresDataSource(postgresConfig)
  );
  await bootstrapTable(repository, 'bootstrap_phone_brand');
  await bootstrapTable(repository, 'bootstrap_phone_model');
  await bootstrapTable(repository, 'bootstrap_phone');
  await bootstrapTable(repository, 'bootstrap_user');
  await bootstrapTable(repository, 'bootstrap_user_credentials');

  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
