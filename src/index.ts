/* istanbul ignore file */
import 'module-alias/register'
import {ApplicationConfig, PhoneQAManagerApplication} from './application';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new PhoneQAManagerApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  const env = process.env.NODE_ENV
  console.log(`Server is running at ${url}, ${env} environment`);
  console.log(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3020),
      host: process.env.HOST ?? '0.0.0.0',
      gracePeriodForClose: 5000,
      openApiSpec: {
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}
