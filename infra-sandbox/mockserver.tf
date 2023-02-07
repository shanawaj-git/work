resource "azurerm_container_group" "mock-service" {
  name                = "escribe-mock-service"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  ip_address_type     = "public"
  dns_name_label      = "mock-service-dev-escribe"
  os_type             = "Linux"
  restart_policy      = "Always"
  diagnostics {
    log_analytics {
      log_type      = "ContainerInsights"
      workspace_id  = var.WORKSPACE_ID
      workspace_key = var.WORKSPACE_KEY
    }
  }
  container {
    name   = "escribe-mock-service"
    image  = "registry.gitlab.com/albathanext/nexthealth1/mock-server:latest"
    cpu    = "1"
    memory = "3"

    ports {
      port     = 5001
      protocol = "TCP"
    }
    environment_variables = {
      KAFKA_BROKER_URL     = var.KAFKA_BROKERS
      KAFKA_SASL_USERNAME  = var.KAFKA_SASL_USERNAME
      KAFKA_SASL_PASSWORD  = var.KAFKA_SASL_PASSWORD
      KAFKA_SASL_MECHANISM = "plain"
    }
  }

  image_registry_credential {
    server   = "registry.gitlab.com"
    username = "TF_CICD"
    password = var.DOCKER_REGISTRY_SERVER_PASSWORD
  }

  tags = {
    environment = "Sandbox"
  }
}
