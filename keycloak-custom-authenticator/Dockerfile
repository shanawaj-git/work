FROM maven:3.6.1-jdk-11 as backend-build
WORKDIR /fullstack/backend

COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src src
RUN mvn install -DskipTests
ARG DEPENDENCY=/fullstack/backend
COPY target/keycloak_custom_authenticator.jar app/