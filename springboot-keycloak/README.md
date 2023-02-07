
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

Run the distribution 

```bash
  docker-compose up
```

This will start the API container exposing the application's port
(set to `8081` in this template app).

In order to test if the application is up, you can call its health endpoint:

```bash
  curl http://localhost:8081/
```



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

