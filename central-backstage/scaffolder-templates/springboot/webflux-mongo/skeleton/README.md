${{values.description}}

## Building and deploying the application

### Building the application

The project uses [Gradle] as a build tool.

Install Gradle (Version 7.4.2):

```bash
brew install gradle
```

To build the project, execute the following command:

```bash
./gradlew clean build
```

### Running the application through Docker

You can run the app using docker-compose defined in /docker-compose folder

Add `.env` file in /docker-compose directory:

then execute:
```bash
docker-compose up -d 
```

Now the App should be running in a docker container that you can access according to the port you exposed.

In order to test if the application is up, you can call it's health endpoint:

```bash
  curl http://localhost:{exposed-port}/
```

Documentation:

`springwolf-kafka` is used for Async API documentation.

To visualize the documentation, you can open `http://localhost:{exposed-port}/springwolf/asyncapi-ui.html` in any browser.

For a JSON representation of the Doc, you can open `http://localhost:{exposed-port}/springwolf/docs`

## License

This project is property of AlBatha Next