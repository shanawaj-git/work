
locals {
  env_variables_common = {
    DOCKER_REGISTRY_SERVER_URL      = var.DOCKER_REGISTRY_SERVER_URL
    DOCKER_REGISTRY_SERVER_USERNAME = var.DOCKER_REGISTRY_SERVER_USERNAME
    DOCKER_REGISTRY_SERVER_PASSWORD = var.DOCKER_REGISTRY_SERVER_PASSWORD
  }
  env_variables_postgres = {
    DATABASE_CLIENT   = "postgres"
    DATABASE_USERNAME = var.DATABASE_USER
    DATABASE_PASSWORD = var.DATABASE_PASSWORD
    DATABASE_HOST     = var.DATABASE_HOST
    DATABASE_NAME     = var.DATABASE_NAME
    DATABASE_PORT     = var.DATABASE_PORT
    DATABASE_SSL      = var.DATABASE_SSL
  }
  env_variables_kafka = {
    # Kafka Settings - Common
    KAFKA_BROKERS        = var.KAFKA_BROKERS
    KAFKA_SASL_USERNAME  = var.KAFKA_SASL_USERNAME
    KAFKA_SASL_PASSWORD  = var.KAFKA_SASL_PASSWORD
    KAFKA_SASL_MECHANISM = "plain"
  }
  env_variables_strapi = {
    APP_KEYS       = var.APP_KEYS
    NODE_ENV       = var.ENVIRONMENT
    HOST           = "0.0.0.0"
    PORT           = 1337
    STRAPI_VERSION = "3.6.8"
    URL            = ""
  }
  env_variables_notifications = {
    # Notification Service
    DB_CONNECTION_STRING = var.DB_CONNECTION_STRING
    SENDER_ID            = var.SENDER_ID
    APP_SID              = var.APP_SID

    PRESCRIPTION_BASE = azurerm_api_management.gateway.gateway_url
  }
  env_variables_prescriptions = {
    KAFKA_CONSUMER_CLIENT_ID = "prescriptions-service"
    KAFKA_TOPIC              = "prescriptions"
    KAFKA_BOOTSTRAP_SERVER   = var.KAFKA_BROKERS
    KAFKA_ADMIN_USER         = var.KAFKA_SASL_USERNAME
    KAFKA_ADMIN_PASSWORD     = "\"${var.KAFKA_SASL_PASSWORD}\""
    POSTGRES_URL             = "jdbc:postgresql://dev-escribe.postgres.database.azure.com:5432/prescriptions"
    POSTGRES_USERNAME        = var.DATABASE_USER
    POSTGRES_PASSWORD        = var.DATABASE_PASSWORD
    SPRING_PROFILES_ACTIVE   = "dev"
    CORS_ALLOWED_HOSTS       = var.CORS_ALLOWED_HOSTS
  }
  env_variables_keycloak = {
    KC_DB_URL               = var.KC_DB_URL
    KC_DB_USERNAME          = var.KC_DB_USERNAME
    KC_DB_PASSWORD          = var.KC_DB_PASSWORD
    KEYCLOAK_ADMIN          = var.KEYCLOAK_ADMIN
    KEYCLOAK_ADMIN_PASSWORD = var.KEYCLOAK_ADMIN_PASSWORD
  }
  env_variables_spring_keycloak = {
    KEYCLOAK_GENERATE_OTP_URL = var.KEYCLOAK_GENERATE_OTP_URL
    KEYCLOAK_VALIDATE_OTP_URL = var.KEYCLOAK_VALIDATE_OTP_URL
    KAFKA_GENERATE_OTP_TOPIC  = var.KAFKA_GENERATE_OTP_TOPIC
    KAFKA_BOOTSTRAP_SERVER    = var.KAFKA_BROKERS
    KAFKA_ON                  = var.KAFKA_ON
    KAFKA_ADMIN_USER          = var.KAFKA_SASL_USERNAME
    KAFKA_ADMIN_PASSWORD      = "\"${var.KAFKA_SASL_PASSWORD}\""
    KEYCLOAK_SERVER_URL       = var.KEYCLOAK_SERVER_URL
    KEYCLOAK_REALM            = var.KEYCLOAK_REALM
    KEYCLOAK_RESOURCE         = var.KEYCLOAK_RESOURCE
    KEYCLOAK_GRANT_TYPE       = var.KEYCLOAK_GRANT_TYPE
    KEYCLOAK_CLIENT_ID        = var.KEYCLOAK_CLIENT_ID
    KEYCLOAK_CLIENT_SECRET    = var.KEYCLOAK_CLIENT_SECRET
    SPRING_PROFILES_ACTIVE    = var.SPRING_PROFILES_ACTIVE
    CORS_ALLOWED_HOSTS        = var.CORS_ALLOWED_HOSTS
  }
  env_variables_unleash = {
    UNLEASH_URL               = var.UNLEASH_URL
    UNLEASH_PROXY_SECRETS     = var.UNLEASH_PROXY_SECRETS
    UNLEASH_INSTANCE_ID       = var.UNLEASH_INSTANCE_ID
    UNLEASH_API_TOKEN         = var.UNLEASH_API_TOKEN
    UNLEASH_PROXY_CLIENT_KEYS = var.UNLEASH_PROXY_CLIENT_KEYS
    UNLEASH_APP_NAME          = var.UNLEASH_APP_NAME
  }
  env_variables_mirth_poc = {
    DATABASE="postgres"
    DATABASE_URL="jdbc:postgresql://dev-escribe.postgres.database.azure.com:5432/mirthpoc"
    DATABASE_MAX_CONNECTIONS="20"
    DATABASE_USERNAME=var.DATABASE_USER
    DATABASE_PASSWORD=var.DATABASE_PASSWORD
    DATABASE_MAX_RETRY="2"
    DATABASE_RETRY_WAIT="10000"
    KEYSTORE_STOREPASS="docker_storepass"
    KEYSTORE_KEYPASS="docker_keypass"
    VMOPTIONS="-Xmx512m"
  }
  env_variables_keycloak_openId = {
    CLIENT_ID = var.KEYCLOAK_OPENID_CLIENT_ID
    CLIENT_SECRET = var.KEYCLOAK_OPENID_CLIENT_SECRET
  }
}
