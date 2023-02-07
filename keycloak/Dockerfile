FROM quay.io/keycloak/keycloak:18.0 as builder

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_FEATURES=token-exchange
ENV KC_DB=postgres
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:18.0
COPY --from=builder /opt/keycloak/lib/quarkus/ /opt/keycloak/lib/quarkus/
COPY ./providers/*.jar /opt/keycloak/providers/
COPY ./data/import/*.json /opt/keycloak/data/import/
WORKDIR /opt/keycloak

ENV KC_DB_URL: "${KEYCLOAK_DB_URL}"
ENV KC_DB_USERNAME : "${KEYCLOAK_DB_USERNAME}"
ENV KC_DB_PASSWORD : "${KEYCLOAK_DB_PASSWORD}"
ENV KAFKA_BOOTSTRAP_SERVER : "${KAFKA_BOOTSTRAP_SERVER}"
ENV KAFKA_ADMIN_USER : "${KAFKA_ADMIN_USER}"
ENV KAFKA_ADMIN_PASSWORD : "${KAFKA_ADMIN_PASSWORD}"
ENV KAFKA_GENERATE_OTP_TOPIC : "${KAFKA_GENERATE_OTP_TOPIC}"
ENV KEYCLOAK_SERVER_URL : "${KEYCLOAK_SERVER_URL}"
ENV KEYCLOAK_REALM : "${KEYCLOAK_REALM}"
ENV KEYCLOAK_RESOURCE : "${KEYCLOAK_RESOURCE}"
ENV KAFKA_ON : "${KAFKA_ON}"
ENV KEYCLOAK_CLIENT_SECRET : "${KEYCLOAK_CLIENT_SECRET}"
ENV KEYCLOAK_CLIENT_ID : "${KEYCLOAK_CLIENT_ID}"
ENV KEYCLOAK_GRANT_TYPE : "${KEYCLOAK_GRANT_TYPE}"

# TODO Update keycloak version when available with support for import-realm
# https://github.com/keycloak/keycloak/pull/10754
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev" ,"--db=postgres"]