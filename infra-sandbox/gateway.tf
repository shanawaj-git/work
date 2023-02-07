resource "azurerm_api_management" "gateway" {
  name                = "escribe-apim"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  publisher_name      = "NextHealth"
  publisher_email     = "redwan.hilali@albathanext.com"

  sku_name = "Developer_1"
}

resource "azurerm_application_insights" "gateway" {
  name                = "escribe-appinsights"
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  application_type    = "other"
}

resource "azurerm_api_management_logger" "gateway" {
  name                = "escribe-logger"
  api_management_name = azurerm_api_management.gateway.name
  resource_group_name = data.azurerm_resource_group.rg.name
  resource_id         = azurerm_application_insights.gateway.id

  application_insights {
    instrumentation_key = azurerm_application_insights.gateway.instrumentation_key
  }
}

# Prescription Service
resource "azurerm_api_management_api" "prescription" {
  name                = "prescription-api"
  resource_group_name = data.azurerm_resource_group.rg.name
  api_management_name = azurerm_api_management.gateway.name
  revision            = "1"
  display_name        = "prescription API"
  path                = "prescriptions/api/graphql"
  protocols           = ["https"]

  service_url = "http://${azurerm_container_group.prescriptions-service.fqdn}:8080/graphql"

  subscription_required = false
}

resource "azurerm_api_management_api_operation" "prescription-get" {
  operation_id        = "prescription-get"
  api_name            = azurerm_api_management_api.prescription.name
  api_management_name = azurerm_api_management_api.prescription.api_management_name
  resource_group_name = azurerm_api_management_api.prescription.resource_group_name
  display_name        = "Proxy toprescription"
  method              = "GET"
  url_template        = "/*"
  description         = "all get requests"
}

resource "azurerm_api_management_api_operation" "prescription-post" {
  operation_id        = "prescription-post"
  api_name            = azurerm_api_management_api.prescription.name
  api_management_name = azurerm_api_management_api.prescription.api_management_name
  resource_group_name = azurerm_api_management_api.prescription.resource_group_name
  display_name        = "Proxy toprescription"
  method              = "POST"
  url_template        = "/*"
  description         = "all post requests"
}

resource "azurerm_api_management_api_operation" "prescription-put" {
  operation_id        = "prescription-put"
  api_name            = azurerm_api_management_api.prescription.name
  api_management_name = azurerm_api_management_api.prescription.api_management_name
  resource_group_name = azurerm_api_management_api.prescription.resource_group_name
  display_name        = "Proxy toprescription"
  method              = "PUT"
  url_template        = "/*"
  description         = "all put requests"
}

resource "azurerm_api_management_api_operation" "prescription-delete" {
  operation_id        = "prescription-delete"
  api_name            = azurerm_api_management_api.prescription.name
  api_management_name = azurerm_api_management_api.prescription.api_management_name
  resource_group_name = azurerm_api_management_api.prescription.resource_group_name
  display_name        = "Proxy toprescription"
  method              = "DELETE"
  url_template        = "/*"
  description         = "all delete requests"
}

resource "azurerm_api_management_api_operation" "prescription-options" {
  operation_id        = "prescription-options"
  api_name            = azurerm_api_management_api.prescription.name
  api_management_name = azurerm_api_management_api.prescription.api_management_name
  resource_group_name = azurerm_api_management_api.prescription.resource_group_name
  display_name        = "Proxy toprescription"
  method              = "OPTIONS"
  url_template        = "/*"
  description         = "all options requests"
}

# Mock Server
resource "azurerm_api_management_api" "mockserver" {
  name                = "mockserver-api"
  resource_group_name = data.azurerm_resource_group.rg.name
  api_management_name = azurerm_api_management.gateway.name
  revision            = "1"
  display_name        = "MockServer API"
  path                = "mockservice"
  protocols           = ["https"]

  service_url = "http://${azurerm_container_group.mock-service.fqdn}:5001"

  subscription_required = false

}

resource "azurerm_api_management_api_operation" "mockserver-proxy-get" {
  operation_id        = "mockserver-proxy-get"
  api_name            = azurerm_api_management_api.mockserver.name
  api_management_name = azurerm_api_management_api.mockserver.api_management_name
  resource_group_name = azurerm_api_management_api.mockserver.resource_group_name
  display_name        = "Proxy tomockserver-proxy"
  method              = "GET"
  url_template        = "/*"
  description         = "all get requests"
}

resource "azurerm_api_management_api_operation" "mockserver-proxy-put" {
  operation_id        = "mockserver-proxy-post"
  api_name            = azurerm_api_management_api.mockserver.name
  api_management_name = azurerm_api_management_api.mockserver.api_management_name
  resource_group_name = azurerm_api_management_api.mockserver.resource_group_name
  display_name        = "Proxy tomockserver-proxy"
  method              = "POST"
  url_template        = "/*"
  description         = "all post requests"
}

resource "azurerm_api_management_api_operation" "mockserver-proxy" {
  operation_id        = "mockserver-proxy-put"
  api_name            = azurerm_api_management_api.mockserver.name
  api_management_name = azurerm_api_management_api.mockserver.api_management_name
  resource_group_name = azurerm_api_management_api.mockserver.resource_group_name
  display_name        = "Proxy tomockserver-proxy"
  method              = "PUT"
  url_template        = "/*"
  description         = "all put requests"
}

resource "azurerm_api_management_api_operation" "mockserver-proxy-delete" {
  operation_id        = "mockserver-proxy-delete"
  api_name            = azurerm_api_management_api.mockserver.name
  api_management_name = azurerm_api_management_api.mockserver.api_management_name
  resource_group_name = azurerm_api_management_api.mockserver.resource_group_name
  display_name        = "Proxy tomockserver-proxy"
  method              = "DELETE"
  url_template        = "/*"
  description         = "all delete requests"
}

resource "azurerm_api_management_api_operation" "mockserver-proxy-options" {
  operation_id        = "mockserver-proxy-options"
  api_name            = azurerm_api_management_api.mockserver.name
  api_management_name = azurerm_api_management_api.mockserver.api_management_name
  resource_group_name = azurerm_api_management_api.mockserver.resource_group_name
  display_name        = "Proxy tomockserver-proxy"
  method              = "OPTIONS"
  url_template        = "/*"
  description         = "all options requests"
}

# CMS Proxy
resource "azurerm_api_management_api" "cms" {
  name                = "cms-service"
  resource_group_name = data.azurerm_resource_group.rg.name
  api_management_name = azurerm_api_management.gateway.name
  revision            = "1"
  display_name        = "CMS Service"
  path                = "cms"
  protocols           = ["https"]

  service_url = "http://${azurerm_container_group.strapi.fqdn}:1337"

  subscription_required = false
}
resource "azurerm_api_management_api_operation" "cms-proxy-get" {
  operation_id        = "cms-proxy-get"
  api_name            = azurerm_api_management_api.cms.name
  api_management_name = azurerm_api_management_api.cms.api_management_name
  resource_group_name = azurerm_api_management_api.cms.resource_group_name
  display_name        = "Proxy to Web App"
  method              = "GET"
  url_template        = "/*"
  description         = "all get requests"
}

resource "azurerm_api_management_api_operation_policy" "cms-fix-admin-path" {
  api_name            = azurerm_api_management_api_operation.cms-proxy-get.api_name
  api_management_name = azurerm_api_management_api_operation.cms-proxy-get.api_management_name
  resource_group_name = azurerm_api_management_api_operation.cms-proxy-get.resource_group_name
  operation_id        = azurerm_api_management_api_operation.cms-proxy-get.operation_id
  xml_content         = <<XML
<policies>
  <inbound>
    <find-and-replace from="/admin/" to="/cms/admin/" />
  </inbound>
</policies>
XML
}

resource "azurerm_api_management_api_operation" "cms-proxy-post" {
  operation_id        = "cms-proxy-post"
  api_name            = azurerm_api_management_api.cms.name
  api_management_name = azurerm_api_management_api.cms.api_management_name
  resource_group_name = azurerm_api_management_api.cms.resource_group_name
  display_name        = "Proxy to Web App"
  method              = "POST"
  url_template        = "/*"
  description         = "all post requests"
}

resource "azurerm_api_management_api_operation" "cms-proxy-put" {
  operation_id        = "cms-proxy-put"
  api_name            = azurerm_api_management_api.cms.name
  api_management_name = azurerm_api_management_api.cms.api_management_name
  resource_group_name = azurerm_api_management_api.cms.resource_group_name
  display_name        = "Proxy to Web App"
  method              = "PUT"
  url_template        = "/*"
  description         = "all put requests"
}

resource "azurerm_api_management_api_operation" "cms-proxy-delete" {
  operation_id        = "cms-proxy-delete"
  api_name            = azurerm_api_management_api.cms.name
  api_management_name = azurerm_api_management_api.cms.api_management_name
  resource_group_name = azurerm_api_management_api.cms.resource_group_name
  display_name        = "Proxy to Web App"
  method              = "DELETE"
  url_template        = "/*"
  description         = "all delete requests"
}

resource "azurerm_api_management_api_operation" "cms-proxy-options" {
  operation_id        = "cms-proxy-options"
  api_name            = azurerm_api_management_api.cms.name
  api_management_name = azurerm_api_management_api.cms.api_management_name
  resource_group_name = azurerm_api_management_api.cms.resource_group_name
  display_name        = "Proxy to Web App"
  method              = "OPTIONS"
  url_template        = "/*"
  description         = "all options requests"
}

# Auth Service Proxy and Operations 
resource "azurerm_api_management_api" "auth-proxy" {
  name                = "auth"
  resource_group_name = data.azurerm_resource_group.rg.name
  api_management_name = azurerm_api_management.gateway.name
  revision            = "1"
  display_name        = "Auth Service"
  path                = "auth/api/graphql"
  protocols           = ["https", "http"]

  service_url = "http://${azurerm_container_group.authentication-service.fqdn}:8081/graphql"

  subscription_required = false
}

resource "azurerm_api_management_api_operation" "auth-proxy-get" {
  operation_id        = "auth-proxy-get"
  api_name            = azurerm_api_management_api.auth-proxy.name
  api_management_name = azurerm_api_management_api.auth-proxy.api_management_name
  resource_group_name = azurerm_api_management_api.auth-proxy.resource_group_name
  display_name        = "Proxy to Auth API"
  method              = "GET"
  url_template        = "/*"
  description         = "all get requests"
}

resource "azurerm_api_management_api_operation" "auth-proxy-post" {
  operation_id        = "auth-proxy-post"
  api_name            = azurerm_api_management_api.auth-proxy.name
  api_management_name = azurerm_api_management_api.auth-proxy.api_management_name
  resource_group_name = azurerm_api_management_api.auth-proxy.resource_group_name
  display_name        = "Proxy to Auth API"
  method              = "POST"
  url_template        = "/*"
  description         = "all post requests"
}

resource "azurerm_api_management_api_operation" "auth-proxy-put" {
  operation_id        = "auth-proxy-put"
  api_name            = azurerm_api_management_api.auth-proxy.name
  api_management_name = azurerm_api_management_api.auth-proxy.api_management_name
  resource_group_name = azurerm_api_management_api.auth-proxy.resource_group_name
  display_name        = "Proxy to Auth API"
  method              = "PUT"
  url_template        = "/*"
  description         = "all put requests"
}

resource "azurerm_api_management_api_operation" "auth-proxy-delete" {
  operation_id        = "auth-proxy-delete"
  api_name            = azurerm_api_management_api.auth-proxy.name
  api_management_name = azurerm_api_management_api.auth-proxy.api_management_name
  resource_group_name = azurerm_api_management_api.auth-proxy.resource_group_name
  display_name        = "Proxy to Auth API"
  method              = "DELETE"
  url_template        = "/*"
  description         = "all delete requests"
}

resource "azurerm_api_management_api_operation" "auth-proxy-options" {
  operation_id        = "auth-proxy-options"
  api_name            = azurerm_api_management_api.auth-proxy.name
  api_management_name = azurerm_api_management_api.auth-proxy.api_management_name
  resource_group_name = azurerm_api_management_api.auth-proxy.resource_group_name
  display_name        = "Proxy to Auth API"
  method              = "OPTIONS"
  url_template        = "/*"
  description         = "all options requests"
}




# Web App Proxy and Operations 
resource "azurerm_api_management_api" "webapp" {
  name                = "webapp"
  resource_group_name = data.azurerm_resource_group.rg.name
  api_management_name = azurerm_api_management.gateway.name
  revision            = "1"
  display_name        = "Web Application"
  path                = ""
  protocols           = ["https", "http"]

  service_url = "http://${azurerm_container_group.webapp.fqdn}:3000"

  subscription_required = false
}

resource "azurerm_api_management_api_operation" "webapp-proxy-get" {
  operation_id        = "webapp-proxy-get"
  api_name            = azurerm_api_management_api.webapp.name
  api_management_name = azurerm_api_management_api.webapp.api_management_name
  resource_group_name = azurerm_api_management_api.webapp.resource_group_name
  display_name        = "Proxy to Web App"
  method              = "GET"
  url_template        = "/*"
  description         = "all get requests"
}

resource "azurerm_api_management_api_operation" "webapp-proxy-post" {
  operation_id        = "webapp-proxy-post"
  api_name            = azurerm_api_management_api.webapp.name
  api_management_name = azurerm_api_management_api.webapp.api_management_name
  resource_group_name = azurerm_api_management_api.webapp.resource_group_name
  display_name        = "Proxy to Web App"
  method              = "POST"
  url_template        = "/*"
  description         = "all post requests"
}

resource "azurerm_api_management_api_operation" "webapp-proxy-put" {
  operation_id        = "webapp-proxy-put"
  api_name            = azurerm_api_management_api.webapp.name
  api_management_name = azurerm_api_management_api.webapp.api_management_name
  resource_group_name = azurerm_api_management_api.webapp.resource_group_name
  display_name        = "Proxy to Web App"
  method              = "PUT"
  url_template        = "/*"
  description         = "all put requests"
}

resource "azurerm_api_management_api_operation" "webapp-proxy-delete" {
  operation_id        = "webapp-proxy-delete"
  api_name            = azurerm_api_management_api.webapp.name
  api_management_name = azurerm_api_management_api.webapp.api_management_name
  resource_group_name = azurerm_api_management_api.webapp.resource_group_name
  display_name        = "Proxy to Web App"
  method              = "DELETE"
  url_template        = "/*"
  description         = "all delete requests"
}

resource "azurerm_api_management_api_operation" "webapp-proxy-options" {
  operation_id        = "webapp-proxy-options"
  api_name            = azurerm_api_management_api.webapp.name
  api_management_name = azurerm_api_management_api.webapp.api_management_name
  resource_group_name = azurerm_api_management_api.webapp.resource_group_name
  display_name        = "Proxy to Web App"
  method              = "OPTIONS"
  url_template        = "/*"
  description         = "all options requests"
}


# Unleash Proxy
resource "azurerm_api_management_api" "unleash" {
  name                = "unleash-service"
  resource_group_name = data.azurerm_resource_group.rg.name
  api_management_name = azurerm_api_management.gateway.name
  revision            = "1"
  display_name        = "unleash Service"
  path                = "unleash"
  protocols           = ["https"]

  service_url = "http://${azurerm_container_group.unleash.fqdn}:3000"

  subscription_required = false
}
resource "azurerm_api_management_api_operation" "unleash-proxy-get" {
  operation_id        = "unleash-proxy-get"
  api_name            = azurerm_api_management_api.unleash.name
  api_management_name = azurerm_api_management_api.unleash.api_management_name
  resource_group_name = azurerm_api_management_api.unleash.resource_group_name
  display_name        = "Proxy to unleash App"
  method              = "GET"
  url_template        = "/*"
  description         = "all get requests"
}

# Mirth Engine admin
resource "azurerm_api_management_api" "mirthpoc" {
  name                = "mirthpoc-service"
  resource_group_name = data.azurerm_resource_group.rg.name
  api_management_name = azurerm_api_management.gateway.name
  revision            = "1"
  display_name        = "Mirth POC"
  path                = "mirthpoc"
  protocols           = ["https"]

  service_url = "https://${azurerm_container_group.mirth-poc.fqdn}:8443"

  subscription_required = false
}
resource "azurerm_api_management_api_operation" "mirthpoc-proxy-get" {
  operation_id        = "mirthpoc-proxy-get"
  api_name            = azurerm_api_management_api.mirthpoc.name
  api_management_name = azurerm_api_management_api.mirthpoc.api_management_name
  resource_group_name = azurerm_api_management_api.mirthpoc.resource_group_name
  display_name        = "Proxy to Mith POC Admin"
  method              = "GET"
  url_template        = "/*"
  description         = "all get requests"
}

resource "azurerm_api_management_api_operation" "mirthpoc-proxy-post" {
  operation_id        = "mirthpoc-proxy-post"
  api_name            = azurerm_api_management_api.mirthpoc.name
  api_management_name = azurerm_api_management_api.mirthpoc.api_management_name
  resource_group_name = azurerm_api_management_api.mirthpoc.resource_group_name
  display_name        = "Proxy to Mirth POC Admin"
  method              = "POST"
  url_template        = "/*"
  description         = "all post requests"
}

resource "azurerm_api_management_api_operation" "mirthpoc-proxy-put" {
  operation_id        = "mirthpoc-proxy-put"
  api_name            = azurerm_api_management_api.mirthpoc.name
  api_management_name = azurerm_api_management_api.mirthpoc.api_management_name
  resource_group_name = azurerm_api_management_api.mirthpoc.resource_group_name
  display_name        = "Proxy to Mirth POC Admin"
  method              = "PUT"
  url_template        = "/*"
  description         = "all put requests"
}

resource "azurerm_api_management_api_operation" "mirthpoc-proxy-delete" {
  operation_id        = "mirthpoc-proxy-delete"
  api_name            = azurerm_api_management_api.mirthpoc.name
  api_management_name = azurerm_api_management_api.mirthpoc.api_management_name
  resource_group_name = azurerm_api_management_api.mirthpoc.resource_group_name
  display_name        = "Proxy to Mirth POC Admin"
  method              = "DELETE"
  url_template        = "/*"
  description         = "all delete requests"
}

resource "azurerm_api_management_api_operation" "mirthpoc-proxy-options" {
  operation_id        = "mirthpoc-proxy-options"
  api_name            = azurerm_api_management_api.mirthpoc.name
  api_management_name = azurerm_api_management_api.mirthpoc.api_management_name
  resource_group_name = azurerm_api_management_api.mirthpoc.resource_group_name
  display_name        = "Proxy to Mirth POC Admin"
  method              = "OPTIONS"
  url_template        = "/*"
  description         = "all options requests"
}

# Mirth Engine sample channel
resource "azurerm_api_management_api" "mirthpoc_channel" {
  name                = "mirthpoc_channel-service"
  resource_group_name = data.azurerm_resource_group.rg.name
  api_management_name = azurerm_api_management.gateway.name
  revision            = "1"
  display_name        = "Mirth POC Sample Channel"
  path                = "mirthpoc_channel"
  protocols           = ["https"]

  service_url = "http://${azurerm_container_group.mirth-poc.fqdn}:8085"

  subscription_required = false
}
resource "azurerm_api_management_api_operation" "mirthpoc_channel-proxy-get" {
  operation_id        = "mirthpoc_channel-proxy-get"
  api_name            = azurerm_api_management_api.mirthpoc_channel.name
  api_management_name = azurerm_api_management_api.mirthpoc_channel.api_management_name
  resource_group_name = azurerm_api_management_api.mirthpoc_channel.resource_group_name
  display_name        = "Proxy to Mirth POC Sample Channel"
  method              = "GET"
  url_template        = "/*"
  description         = "all get requests"
}

resource "azurerm_api_management_api_operation" "mirthpoc_channel-proxy-post" {
  operation_id        = "mirthpoc_channel-proxy-post"
  api_name            = azurerm_api_management_api.mirthpoc_channel.name
  api_management_name = azurerm_api_management_api.mirthpoc_channel.api_management_name
  resource_group_name = azurerm_api_management_api.mirthpoc_channel.resource_group_name
  display_name        = "Proxy to Mirth POC Sample Channel"
  method              = "POST"
  url_template        = "/*"
  description         = "all post requests"
}

resource "azurerm_api_management_api_operation" "mirthpoc_channel-proxy-put" {
  operation_id        = "mirthpoc_channel-proxy-put"
  api_name            = azurerm_api_management_api.mirthpoc_channel.name
  api_management_name = azurerm_api_management_api.mirthpoc_channel.api_management_name
  resource_group_name = azurerm_api_management_api.mirthpoc_channel.resource_group_name
  display_name        = "Proxy to Mirth POC Sample Channel"
  method              = "PUT"
  url_template        = "/*"
  description         = "all put requests"
}

resource "azurerm_api_management_api_operation" "mirthpoc_channel-proxy-delete" {
  operation_id        = "mirthpoc_channel-proxy-delete"
  api_name            = azurerm_api_management_api.mirthpoc_channel.name
  api_management_name = azurerm_api_management_api.mirthpoc_channel.api_management_name
  resource_group_name = azurerm_api_management_api.mirthpoc_channel.resource_group_name
  display_name        = "Proxy to Mirth POC Sample Channel"
  method              = "DELETE"
  url_template        = "/*"
  description         = "all delete requests"
}

resource "azurerm_api_management_api_operation" "mirthpoc_channel-proxy-options" {
  operation_id        = "mirthpoc_channel-proxy-options"
  api_name            = azurerm_api_management_api.mirthpoc_channel.name
  api_management_name = azurerm_api_management_api.mirthpoc_channel.api_management_name
  resource_group_name = azurerm_api_management_api.mirthpoc_channel.resource_group_name
  display_name        = "Proxy to Mirth POC Sample Channel"
  method              = "OPTIONS"
  url_template        = "/*"
  description         = "all options requests"
}

