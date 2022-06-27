resource "azurerm_linux_web_app" "kgas_web" {
  name                = "kgas-web"
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = azurerm_service_plan.self.location
  service_plan_id     = azurerm_service_plan.self.id

  app_settings = {
    DOCKER_REGISTRY_SERVER_URL      = azurerm_container_registry.acr.login_server
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.acr.admin_password
    REACT_APP_LOGMAP_API_URL        = azurerm_linux_web_app.kgas_api.default_hostname
  }
  site_config {
    always_on = false
    application_stack {
      docker_image     = "${azurerm_container_registry.acr.login_server}/web"
      docker_image_tag = "6ec38fb"
    }
  }
}
