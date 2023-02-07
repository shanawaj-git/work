data "azurerm_cosmosdb_account" "escribe" {
  name                = "dev-escribe"
  resource_group_name = data.azurerm_resource_group.rg.name
  #   name                = "dev-escribe"
  #   location            = azurerm_resource_group.rg.location
  #   resource_group_name = azurerm_resource_group.rg.name
  #   offer_type          = "Standard"

  #   enable_automatic_failover = false

  #   consistency_policy {
  #     consistency_level       = "Session"
  #     max_interval_in_seconds = 5
  #     max_staleness_prefix    = 100000
  #   }
  #   geo_location {
  #     location          = azurerm_resource_group.rg.location
  #     failover_priority = 0
  #   }

  #   lifecycle {
  #     prevent_destroy = true
  #   }
}

