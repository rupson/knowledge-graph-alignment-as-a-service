type StorageMethod = 'local' | 'azure';
type Config = {
	storageMethod: StorageMethod;
	appBaseUrl: string;
};

const isStorageMethod = (
	maybeStorageMethod: any,
): maybeStorageMethod is StorageMethod =>
	!!maybeStorageMethod && ['local', 'azure'].includes(maybeStorageMethod);
const storageMethod = process.env.STORAGE_METHOD || '';
if (!isStorageMethod(storageMethod))
	throw new Error(
		`Storage method must be an env var with value of 'local' or 'azure'`,
	);

const appBaseUrl = process.env.BASE_URL || `http://localhost:4000`;

export const config: Config = {
	storageMethod,
	appBaseUrl,
};
