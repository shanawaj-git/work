
resource "azurerm_container_group" "unleash" {
  name                = "escribe-unleash"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  ip_address_type     = "public"
  dns_name_label      = "unleash-dev-escribe"
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
    name   = "escribe-unleash"
    image  = "unleashorg/unleash-proxy"
    cpu    = "1"
    memory = "3"

    ports {
      port     = 3000
      protocol = "TCP"
    }
    environment_variables = local.env_variables_unleash
  }

  tags = {
    environment = "Sandbox"
  }
}
