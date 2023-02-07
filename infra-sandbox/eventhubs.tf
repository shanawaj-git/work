resource "azurerm_eventhub_namespace" "escribe" {
  name                = "dev-escribe"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  sku                 = "Standard"
  capacity            = 1

  tags = {
    environment = "Sandbox"
    CostCenter  = "Nexthealth"
  }
}

resource "azurerm_eventhub" "prescriptions" {
  name                = "prescriptions"
  namespace_name      = azurerm_eventhub_namespace.escribe.name
  resource_group_name = data.azurerm_resource_group.rg.name
  partition_count     = 3
  message_retention   = 7
}

resource "azurerm_eventhub" "notifications" {
  name                = "notifications"
  namespace_name      = azurerm_eventhub_namespace.escribe.name
  resource_group_name = data.azurerm_resource_group.rg.name
  partition_count     = 3
  message_retention   = 7
}

resource "azurerm_eventhub" "orders" {
  name                = "orders"
  namespace_name      = azurerm_eventhub_namespace.escribe.name
  resource_group_name = data.azurerm_resource_group.rg.name
  partition_count     = 3
  message_retention   = 7
}

resource "azurerm_eventhub" "authentication" {
  name                = "authentication"
  namespace_name      = azurerm_eventhub_namespace.escribe.name
  resource_group_name = data.azurerm_resource_group.rg.name
  partition_count     = 3
  message_retention   = 7
}

# Consumer Groups
resource "azurerm_eventhub_consumer_group" "notifications-notifications" {
  name                = "notifications-service"
  namespace_name      = azurerm_eventhub_namespace.escribe.name
  eventhub_name       = azurerm_eventhub.notifications.name
  resource_group_name = data.azurerm_resource_group.rg.name
}

resource "azurerm_eventhub_consumer_group" "notifications-prescriptions" {
  name                = "notifications-service"
  namespace_name      = azurerm_eventhub_namespace.escribe.name
  eventhub_name       = azurerm_eventhub.prescriptions.name
  resource_group_name = data.azurerm_resource_group.rg.name
}

resource "azurerm_eventhub_consumer_group" "notifications-authentication" {
  name                = "notifications-service"
  namespace_name      = azurerm_eventhub_namespace.escribe.name
  eventhub_name       = azurerm_eventhub.authentication.name
  resource_group_name = data.azurerm_resource_group.rg.name
}
