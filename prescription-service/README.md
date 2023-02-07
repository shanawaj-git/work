
## Building and deploying the application

### Building the application

The project uses [Maven] as a build tool. It already contains
 

To build the project execute the following command:

```bash
  mvn clean insatll
```

### Running the application

Create the image of the application by executing the following command:


Create docker image:

```bash
  docker-compose build 
```
```bash
KAFKA_TOPIC=prescriptions
KAFKA_BOOTSTRAP_SERVER= 
KAFKA_ADMIN_USER= 
KAFKA_ADMIN_PASSWORD= 
POSTGRES_URL= 
POSTGRES_USERNAME= 
POSTGRES_PASSWORD= 
SPRING_PROFILES_ACTIVE=
```
Run the distribution 

```bash
  docker-compose up
```

This will start the API container exposing the application's port
(set to `8081` in this template app).

In order to test if the application is up, you can call its health endpoint:

```bash
  curl http://localhost:8084/
```

Async Documentation : 
For async documentation used library springwolf-kafka and springwolf-ui
Documentation UI is exposed at below URL 

```bash
  curl http://localhost:8080/springwolf/asyncapi-ui.html
```

## License

This project is property of Albatha Next

