FROM adoptopenjdk/openjdk11 As builder
LABEL builder=true
WORKDIR /app
RUN rm -rf /app/*
COPY . .
RUN ./gradlew clean build -x test
ENV JAVA_OPTS=""
VOLUME /tmp
RUN rm  /app/build/libs/*plain.jar
FROM adoptopenjdk/openjdk11

COPY --from=builder /app/build/libs/*.jar /service.jar
ENTRYPOINT [ "sh", "-c", "java -jar /service.jar" ]