resource "azurerm_storage_account" "alignment_outputs" {
  name                     = "kgaaasalignmentoutputs"
  resource_group_name      = azurerm_resource_group.resource_group.name
  location                 = azurerm_resource_group.resource_group.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  # allow_blob_public_access = true
}

resource "azurerm_storage_container" "alignment_outputs" {
  name                  = "outputs"
  storage_account_name  = azurerm_storage_account.alignment_outputs.name
  container_access_type = "blob"
}
