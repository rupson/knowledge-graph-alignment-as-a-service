resource "azurerm_linux_web_app" "kgas_api" {
  name                = "kgas-api"
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = azurerm_service_plan.self.location
  service_plan_id     = azurerm_service_plan.self.id

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL      = azurerm_container_registry.acr.login_server
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.acr.admin_password
    SSH_USER                        = "rob"
    LOGMAP_URL                      = azurerm_container_group.logmap_container.ip_address
    AZURE_OUTPUT_CONTAINER_NAME     = "outputs"
    AZURE_STORAGE_CONNECTION_STRING = azurerm_storage_account.alignment_outputs.primary_connection_string
  }
  site_config {
    always_on = false
    application_stack {
      docker_image     = "${azurerm_container_registry.acr.login_server}/rest-server"
      docker_image_tag = "d7522d2"
    }
  }
}
