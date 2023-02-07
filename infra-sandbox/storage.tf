resource "azurerm_storage_account" "escribe" {
  name                     = "escribedev"
  resource_group_name      = data.azurerm_resource_group.rg.name
  location                 = data.azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_share" "escribe-strapi" {
  name                 = "strapi"
  storage_account_name = azurerm_storage_account.escribe.name
  quota                = 50
}
