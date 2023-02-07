
resource "azurerm_api_management_openid_connect_provider" "keycloak" {
  name                = "keycloak-provider"
  api_management_name = azurerm_api_management.gateway.name
  resource_group_name = data.azurerm_resource_group.rg.name
  client_id           = var.KEYCLOAK_OPENID_CLIENT_ID
  client_secret       = var.KEYCLOAK_OPENID_CLIENT_SECRET
  display_name        = "Keycloak Provider"
  metadata_endpoint   =  "https://${azurerm_container_group.authentication-service.fqdn}:8080/realms/nexthealth-sms-otp/.well-known/openid-configuration"
}