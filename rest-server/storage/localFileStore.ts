import fs from 'fs';

export const outputFileExistsWithId = (fileName: string): boolean =>
	fs.existsSync(`/usr/src/app/outputs/${fileName}.zip`);
