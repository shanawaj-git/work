# Strapi CMS for NextMobility Solutions

## Overview
This project shall be used for setting up the Strapi CMS for NextMobility Applications.


## Using the Docker Image For Content Management During Development

Please see the [Usage of NextMobility/Strapi CMS Docker Image](example)

## Using Strapi CMS for NextMobility Solutions
- [Content Types and Translations](https://albathanext.atlassian.net/wiki/spaces/NM/pages/36765756/Content+Types+-+Automotive)
- [Application Configurations](https://albathanext.atlassian.net/wiki/spaces/NH/pages/22610090/Application+Configuration)
- [Assets(Media) Management](https://albathanext.atlassian.net/wiki/spaces/NH/pages/22839486/Assets+Media+Management)
- [Security](https://albathanext.atlassian.net/wiki/spaces/NM/pages/36569142/Strapi+CMS+for+Next+Mobility)
- [Frontend Integration](https://albathanext.atlassian.net/wiki/spaces/NH/pages/23134246/Frontend+Integration)

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

## ⚙️ Deployment

Please see the [Usage of Automotive/Strapi CMS Docker Image](example)

## 📚 Learn more

### 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://docs.strapi.io) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

