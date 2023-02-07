## Prerequisites
Docker engine:
- required version >= `20.*.*`
- [Installation docs](https://docs.docker.com/get-docker/)

Docker compose:
- required version => `2.*.*`
- [Installation docs](https://docs.docker.com/compose/install/)


##### Pulling the latest docker image
Before you can build and push images, you must authenticate with the Container Registry(registry.gitlab.com)

To authenticate, you can use:
- A personal access token.
- A deploy token.

Both of these require the minimum scope to be:
- For read (pull) access, `read_registry`

To authenticate, run the docker command:
``` sh
docker login registry.gitlab.com -u <username> -p <token>
```

Pull the latest images using the following command:
``` sh
docker-compose pull
```

##### Sample docker-compose

```
services:
  strapi:
    image: registry.gitlab.com/albathanext/nexthealth1/strapi-cms
    environment:
      NODE_ENV: ${NODE_ENV}
      DATABASE_CLIENT: ${DATABASE_CLIENT}
      DATABASE_NAME: ${DATABASE_NAME}
      DATABASE_HOST: ${DATABASE_HOST}
      DATABASE_PORT: ${DATABASE_PORT}
      DATABASE_USERNAME: ${DATABASE_USERNAME}
      DATABASE_PASSWORD: ${DATABASE_PASSWORD}
      DATABASE_SSL: ${DATABASE_SSL}
      HOST: ${HOST}
      PORT: ${PORT}
      APP_KEYS: ${APP_KEYS}
      JWT_SECRET: ${JWT_SECRET}
      API_TOKEN_SALT: ${API_TOKEN_SALT}

    ports:
      - '1337:1337'
```

##### Environment Setup
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
  NODE_ENV=production

  HOST={host}
  PORT=1337
  APP_KEYS={app.key1},{app.key2},{app.key3},{app.key4}
  JWT_SECRET={jwt.secret}
  API_TOKEN_SALT={api.token.salt}
```

##### Starting the server

To execute Docker image detaching the terminal
``` sh
docker-compose up -d
```

To execute Docker image without detaching the terminal
``` sh
docker-compose up
```

##### Stoping the server

To stop the containers without destroying them and be able to start them again later
``` sh
% docker-compose stop
```

To stop the app, delete the container, delete the image
``` sh
% docker-compose down --rmi all -v
```
