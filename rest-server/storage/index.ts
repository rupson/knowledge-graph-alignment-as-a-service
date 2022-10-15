import { getBlobProperties, uploadToAzure } from '../azure';
import { config } from '../config';
import { outputFileExistsWithId } from './localFileStore';

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
	getFileProperties: async (alignmentId: string) => {
		if (!outputFileExistsWithId(alignmentId)) return undefined;
		return {
			url: `${config.appBaseUrl}/download/${alignmentId}`,
		};
	},
	saveFile: async (_) => {},
};

export const getFileStore = () => {
	const { storageMethod } = config;
	return { local: localFileStore, azure: azureFileStore }[storageMethod];
};
