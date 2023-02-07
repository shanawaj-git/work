
resource "azurerm_container_group" "prescriptions-service" {
  name                = "escribe-prescriptions-service"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  ip_address_type     = "public"
  dns_name_label      = "prescriptions-service-dev-escribe"
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
    name   = "escribe-prescriptions-service"
    image  = "registry.gitlab.com/albathanext/nexthealth1/prescription-service:latest"
    cpu    = "1"
    memory = "3"

    ports {
      port     = 8080
      protocol = "TCP"
    }
    environment_variables = merge(local.env_variables_common, local.env_variables_prescriptions)
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
