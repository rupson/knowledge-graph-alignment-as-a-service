import { BlobServiceClient } from "@azure/storage-blob";

const {
	AZURE_STORAGE_CONNECTION_STRING: blobStorageConnectionString,
	AZURE_OUTPUT_CONTAINER_NAME: outputContainerName,
} = process.env;

if (!blobStorageConnectionString || !outputContainerName) {
	throw new Error(`Missing storage connection string`);
}
const blobContainerClient = BlobServiceClient.fromConnectionString(
	blobStorageConnectionString,
).getContainerClient(outputContainerName);

export const uploadToAzure = async (requestId: string) => {
	console.log(`>> uploading zip file to azure`, requestId);
	try {
		const uploadResponse = await blobContainerClient
			.getBlockBlobClient(`${requestId}.zip`)
			.uploadFile(`./outputs/${requestId}.zip`);
		console.log(`>> upload to azure complete`, uploadResponse);
		return uploadResponse;
	} catch (err) {
		console.log(`>> failed to upload zip file to azure.`, { requestId, err });
    throw err;
	}
};
