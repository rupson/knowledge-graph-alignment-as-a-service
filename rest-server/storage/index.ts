import { getBlobProperties, uploadToAzure } from '../azure';

type FileStore = {
	getFileProperties: (fileName: string) => Promise<{ url: string } | undefined>;
	saveFile: (fileName: string) => Promise<void>;
};

const azureFileStore: FileStore = {
	getFileProperties: async (fileName: string) => {
		try {
			const res = await getBlobProperties(fileName);
			if (!res) {
				return undefined;
			}
			return { url: res._response.request.url };
		} catch (err) {
			return undefined;
		}
	},
	saveFile: async (fileName: string) => uploadToAzure(fileName).then(),
};

const localFileStore: FileStore = {
	getFileProperties: undefined,
	saveFile: undefined,
};

export const getFileStore = () => {
	const storageMethod = process.env.STORAGE_METHOD || '';

	if (!['local', 'azure'].includes(storageMethod))
		throw new Error('Storage method must be provided in env var');

	return (
		{ local: localFileStore, azure: azureFileStore }[storageMethod] ||
		localFileStore
	);
};
