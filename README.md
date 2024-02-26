# Phone QA Manager

Lets you reserve and return a phone for testing

## Pre-requisites

Requires Node 14 installation and a PostgreSQL server available for connections

## Installation

Run in the root directory to install dependencies
```
npm install
```

## Configuration

The manager requires a postgres datasource configuration.
The datasource configuration is stored in /src/datasources/postgres.datasource.ts.
Adjust user, host, port, password and database to match those of your PostgreSQL installation 

## Running

Before the initial start, run to create database tables and populate them with data

```sh
npm run migrate
```

The tables will be created in ph_qa_manager schema.
In case something goes wrong during migration, deleting all tables in the schema and trying again could help.

When migration is over, run 

```sh
npm run start
```

On successful start this line will appear in the console

'Try http://127.0.0.1:3020/explorer to see openApi documentation'
Following this address will open an openApi specification of the project.
Most request to the API require authentication.
A user can be added using POST /users/signup endpoint.
Then POST /users/login endpoint can be used to get an access token for authentication in /explorer or other API clients.



To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file

## Tests

```sh
npm test
```

## What's next

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
