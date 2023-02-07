resource "azurerm_container_group" "strapi" {
  name                = "escribe-strapi"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  ip_address_type     = "public"
  dns_name_label      = "strapi-dev-escribe"
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
    name   = "escribe-strapi"
    image  = "registry.gitlab.com/albathanext/nexthealth1/strapi-cms:latest"
    cpu    = "1"
    memory = "3"

    ports {
      port     = 1337
      protocol = "TCP"
    }
    environment_variables = merge(local.env_variables_common, local.env_variables_strapi, local.env_variables_postgres)

    volume {
      name                 = "escribestrapi"
      mount_path           = "/usr/src/app/public/uploads"
      storage_account_name = azurerm_storage_account.escribe.name
      storage_account_key  = azurerm_storage_account.escribe.primary_access_key
      share_name           = azurerm_storage_share.escribe-strapi.name
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
