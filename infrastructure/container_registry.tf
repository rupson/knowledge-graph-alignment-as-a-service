resource "azurerm_container_registry" "acr" {
  name                = "kgasacr"
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = azurerm_resource_group.resource_group.location
  sku                 = "Basic"
  admin_enabled       = true
}
