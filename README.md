## Installation

```bash
$ npm install
```

## Running the app

First, run the database and migrations:
```bash
$ docker compose up
$ npx prisma migrate dev
```

Then, run the app:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

