resource "azurerm_container_group" "logmap_container" {
  name                = "logmap"
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = azurerm_resource_group.resource_group.location
  os_type             = "Linux"

  image_registry_credential {
    server   = azurerm_container_registry.acr.login_server
    username = azurerm_container_registry.acr.admin_username
    password = azurerm_container_registry.acr.admin_password
  }

  container {
    name  = "logmap"
    image = "${azurerm_container_registry.acr.login_server}/logmap:d7522d2"

    cpu    = 1
    memory = 1.5

    ports {
      port     = 22
      protocol = "TCP"
    }

  }

}
