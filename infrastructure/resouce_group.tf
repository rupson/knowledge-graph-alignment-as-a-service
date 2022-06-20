resource "azurerm_resource_group" "resource_group" {
  name     = "kgas_rg"
  location = var.az_location
}
