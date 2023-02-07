# E-SCRIBE-DOCKER-COMPOSE

## Goals

Create a development environment which contains e-scribe services

- [Mock-server](http://localhost:5001/api/v1/docs/)
- Notifications
- Prescriptions
- [Keycloak & Custom authenticator service](http://localhost:8080)
- Spring boot custom authenticator

## Prerequisites

- [Install docker](https://docs.docker.com/get-docker/)
- [Install docker compose](https://docs.docker.com/compose/install/)
- After installing docker make sure that you have enough **resources** at least 6 GB Memory , 2 GB swap and 5 CPUs
- Login to Albatha private repo `docker login https://registry.gitlab.com/v2/albathanext`

## Installation

### Deployment environment

Starting a development environment

```sh
./start.sh
```

Stopping a development environment

```sh
./stop.sh
```

> > **Note:** `COMPOSE_PROFILES` variable in `.env` shall be used to enable or disable services
