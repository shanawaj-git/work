# Strapi CMS OTP POC

## Overview
This project shall be used for evaluating the following

- How can we use phone number as username instead of email
- How can we mix emails and phone number as usernames
- How can we force an OTP to expire
- How can we update the password on regular basis without any limits

## Development

### Prerequisites
Node.js:
- required version >= `16.10`
- [Installation docs](https://yarnpkg.com/getting-started/install)

Yarn:
- required version >= `1.22`
- [Installation docs](https://nodejs.org/en/)

### Environment Setup

Make sure that `.env` file is placed at the project root directory with the following environment variables
```
  STRAPI_VERSION=3.6.8
  DATABASE_CLIENT=postgres
  DATABASE_NAME=strapi
  DATABASE_HOST={db.host}
  DATABASE_PORT=5432
  DATABASE_USERNAME={db.username}
  DATABASE_PASSWORD={db.password}
  DATABASE_SSL=true
  NODE_ENV=development

  HOST=0.0.0.0
  PORT=1337
  APP_KEYS=appkey1,appkey2,appkey3,appkey4
  JWT_SECRET={jwt.secret}
  API_TOKEN_SALT={api.token.salt}
```

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
yarn build
```

### `test`

```
yarn test
```
