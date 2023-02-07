# Strapi Diabetic APP CMS

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html) (CLI) which lets you scaffold and manage your project in seconds.

# Enviroment Setup

```

NODE_ENV=development/production
HOST=0.0.0.0
PORT=1337

DATABASE_CLIENT=postgres
DATABASE_NAME=diabetic-app-cms
DATABASE_HOST=dev-escribe.postgres.database.azure.com
DATABASE_PORT=5432
DATABASE_USERNAME=devescribe
DATABASE_PASSWORD=<>
DATABASE_SSL=true

APP_KEYS=['myKeyA']
JWT_SECRET=<>
API_TOKEN_SALT=<>

SMS_APP_SID=
SMS_SENDER_ID=
SMS_ENV=0

PASSWORD_EXPIRY_MINUTES=5
REGENERATE_OTP_INTERVAL_SECONDS=30
REGENERATE_OTP_LOCK_INTERVAL_MINS=60
MAX_UNSUCCESSFUL_LOGIN_COUNT=5
REMINDER_CRON_EXPRESSION=0 9 * * *

HOST_DOMAIN=http://localhost:1337
DIABETIC_WEBAPP_HOST_DOMAIN=http://localhost:3050
// any additional domain to enable CORS for testing purpose
ADDITIONAL_CORS_DOMAINS=

// EMAIL PROVIDER CONFIGURATION
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
EMAIL_USER=no-reply@next-health.io
EMAIL_PASS=
EMAIL_FROM_ID=no-reply@next-health.io
EMAIL_REPLY_TO_ID=no-reply@next-health.io

// PAYMENT PROVIDER
STRIPE_KEY=
STRIPE_WEB_HOOK_KEY=
```

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)

```
npm run build
# or
yarn build
```

### Configuration Dump
To dump the view configurations for different content types, run

```sh
yarn run config:dump

```
The dump will be present at `config/dump/config-dump.json`

### Configuration Restore
To restore the view configurations for different content types, run
Make sure the dump file is present at `config/dump/config-dump.json`

```sh
yarn run config:restore
```
The dump will be restored from `config/dump/config-dump.json`

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project. Find the one that suits you on the [deployment section of the documentation](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html).

## 📚 Learn more

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

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>

## TODO: Setting up cms roles
- Create a role as `Patient` in `users-permissions` extension settings.
- Set `Patient` as the default role for users in `users-permissions` extension.
- Add `yarn run config:restore` to deploy stage of CICD
- Configure message template in App Config .
- Configure Pharmacy details .
