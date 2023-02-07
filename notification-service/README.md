<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

Notifications Service responsible for sending all types of notifications (sms, push, emails...), the service listens on specific kafka topics and generate the right notifications content and type.

### SMS

For SMS, the service is using Unifonic as Provider.

## Installation

```bash
$ yarn install
```

## Environment Variables

```bash
KAFKA_CLIENT_ID=notifications-service
KAFKA_BROKERS=127.0.0.1:29092
KAFKA_GROUP_ID=notifications-service
KAFKA_SASL_USERNAME=admin
KAFKA_SASL_PASSWORD=admin-secret
KAFKA_SASL_MECHANISM='plain'
```

## Running the app

**Before Running The service, make sure Kafka is running locally or to provide the credentials to remote Kafka broker**

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
