Keycloak
========

Overview This project shall be used as an SSO (single sign on ) to authenticate the user NextHealth Applications.

For further details go through below link .

https://www.keycloak.org/server/configuration

### Environment Setup

```
KEYCLOAK_DB_URL=jdbc:postgresql://host.docker.internal:5432/keycloak    URL for the postgres server to be provied here  
KEYCLOAK_DB_USERNAME=postgres username 
KEYCLOAK_DB_PASSWORD=postgres password 
KEYCLOAK_ADMIN= Keycloak admin user name to be provided 
KEYCLOAK_ADMIN_PASSWORD=Keycloak admin password to be provided 
hostname=Hostname for the Keycloak server.
hostname-strict-backchannel=false

```

### `Develop`

```
bin/kc.sh build

```

### `Start in development mode `

```
bin/kc.sh start-dev
```

### `Build and start in production`

```
bin/kc.sh build
bin/kc.sh start
```

### `Build from docker compose `

```
docker-compose build 
```

### `Running from docker compose `

```
docker-compose up
```


