resource "random_string" "resource_code" {
  length  = 5
  special = false
  upper   = false
}

resource "azurerm_storage_account" "tfstate" {
  # random string must be appended to the storage account name because all storage
  # account across Azure must have unique names.
  # see https://docs.microsoft.com/en-us/azure/azure-resource-manager/troubleshooting/error-storage-account-name
  name                     = "tfstate${random_string.resource_code.result}"
  resource_group_name      = azurerm_resource_group.resource_group.name
  location                 = azurerm_resource_group.resource_group.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  # allow_blob_public_access = true
}

resource "azurerm_storage_container" "tfstate" {
  name                  = "tfstate"
  storage_account_name  = azurerm_storage_account.tfstate.name
  container_access_type = "blob"
}
