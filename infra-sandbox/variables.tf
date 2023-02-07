variable "location" {
  default     = "uaenorth"
  description = "Location of the resource group."
}

variable "DOCKER_REGISTRY_SERVER_URL" {}
variable "DOCKER_REGISTRY_SERVER_USERNAME" {}
variable "DOCKER_REGISTRY_SERVER_PASSWORD" {}

variable "DATABASE_USER" {}
variable "DATABASE_PASSWORD" {}
variable "DATABASE_HOST" {}
variable "DATABASE_NAME" {}
variable "DATABASE_PORT" {}
variable "APP_KEYS" {}
variable "DATABASE_SSL" {}

variable "SUBSCRIPTION_ID" {}
variable "CLIENT_ID" {}
variable "CLIENT_SECRET" {}
variable "TENANT_ID" {}

variable "ENVIRONMENT" {
  default = "production"
}

variable "WORKSPACE_ID" {}
variable "WORKSPACE_KEY" {}

#notification service
variable "DB_CONNECTION_STRING" {}
variable "APP_SID" {}
variable "SENDER_ID" {}

#Kafka
variable "KAFKA_BROKERS" {}
variable "KAFKA_SASL_USERNAME" {}
variable "KAFKA_SASL_PASSWORD" {}

#keycloak
variable "KC_DB_URL" {}
variable "KC_DB_USERNAME" {}
variable "KC_DB_PASSWORD" {}
variable "KEYCLOAK_ADMIN" {}
variable "KEYCLOAK_ADMIN_PASSWORD" {}

#Spring keycloak
variable "KEYCLOAK_GENERATE_OTP_URL" {}
variable "KEYCLOAK_VALIDATE_OTP_URL" {}
variable "KAFKA_GENERATE_OTP_TOPIC" {}
variable "KAFKA_ON" {}
variable "KEYCLOAK_SERVER_URL" {}
variable "KEYCLOAK_REALM" {}
variable "KEYCLOAK_RESOURCE" {}
variable "KEYCLOAK_GRANT_TYPE" {}
variable "KEYCLOAK_CLIENT_ID" {}
variable "KEYCLOAK_CLIENT_SECRET" {}
variable "SPRING_PROFILES_ACTIVE" {}
variable "CORS_ALLOWED_HOSTS" {}

#Unleash
variable "UNLEASH_URL" {}
variable "UNLEASH_INSTANCE_ID" {}
variable "UNLEASH_API_TOKEN" {}
variable "UNLEASH_PROXY_CLIENT_KEYS" {}
variable "UNLEASH_APP_NAME" {}
variable "UNLEASH_PROXY_SECRETS" {}

#Keycloak openid
variable "KEYCLOAK_OPENID_CLIENT_ID" {}
variable "KEYCLOAK_OPENID_CLIENT_SECRET" {}