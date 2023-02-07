# Kafka (Single zookeeper - Single broker)
## Goals 
Installing a basic kafka instance with UI manager (Consumers,Brokers,Topics and messages)
## Prerequisites
- [Install docker](https://docs.docker.com/get-docker/)
- Version `20.*.*`
- [Install docker compose](https://docs.docker.com/compose/install/)
- Version `2.*.*`
## Installation
### Development environment (single broker/single zookeeper with a UI for (topics,consumers,messages))

Starting a development environment
```js
./start.sh
```

Open the browser and visit this url `http://localhost:9000` you will find:

- Clusters
- Brokers
- Topics
- Consumers

Stopping a development environment
```js
./stop.sh
```

### Deployment environment (single broker/single zookeeper with a UI for (topics,consumers,messages)) SASL Authentication

Just make sure that you have `.env` file in the root directory and contains the following variables:
```
KAFKA_UI_USERNAME=admin
KAFKA_UI_PASSWORD=admin-secret
KAFKA_SASL_USERNAME=admin
KAFKA_SASL_PASSWORD=admin-secret
KAFKA_UI_PORT=9000
KAFKA_BROKER_PORT=29092
```

We are using SASL authentication between client and broker (username/password) so in  `kafka.jaas.config` you should write the username/password required for authentication also make sure that it's matches with these env variables in `.env` :
```js
KAFKA_SASL_USERNAME=admin
KAFKA_SASL_PASSWORD=admin-secret
```

For **UI**
Open the browser and visit this url `http://localhost:9000`  and enter username/password that exists in `.env`

```js
KAFKA_UI_USERNAME=admin
KAFKA_UI_PASSWORD=admin-secret
```

## Development
- [NestJS kafka integration](https://docs.nestjs.com/microservices/kafka)
- [KafkaJS client configuration](https://kafka.js.org/docs/configuration)

