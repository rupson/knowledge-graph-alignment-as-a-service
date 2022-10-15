import { Request } from 'express-serve-static-core';
import { RequestHandler } from 'express';
import { AlignmentRequest } from '../types';
import { getConfig } from '../environment';
import { execInSsh, exec } from '../sshHelpers';
import { getFileStore } from '../storage';
import { config } from '../config';

const hasRequestId = (req: Request): req is AlignmentRequest =>
	Object.keys(req).includes('requestId');

const JAVA_BINARY = `java`;
const { logmapUrl, sshUser } = getConfig();

const execInLogmap = execInSsh(sshUser, logmapUrl);

const asyncNoop = async (...args: unknown[]) => {};

const cleanRemoteContainer = (requestId: string) =>
	execInLogmap(`
rm -rf /usr/src/app/out/${requestId} && \
rm /usr/src/app/out/${requestId}.zip && \
rm -rf /usr/src/app/data/${requestId}
`);

const cleanLocalContainer = (requestId: string) =>
	exec(`
rm -rf /usr/src/app/outputs/${requestId} && \
rm /usr/src/app/outputs/${requestId}.zip
`);

const cleanup = (requestId: string) => {
	const { storageMethod } = config;

	const localCleanupStrategy =
		storageMethod === 'local' ? asyncNoop : cleanLocalContainer;

	return Promise.all(
		[cleanRemoteContainer, localCleanupStrategy].map((fn) => fn(requestId)),
	);
};

export const alignmentHandler: RequestHandler = async (req, res) => {
	if (!hasRequestId(req)) throw new Error(`missing request id`);
	console.log(
		`>>incoming request `,
		JSON.stringify({
			requestId: req.requestId,
			files: req.files,
		}),
	);

	const { requestId } = req;

	const fileStore = getFileStore();

	res
		.status(201)
		.send({ alignmentId: requestId, message: `Alignment id: ${requestId}` });

	console.log(`>>copying files to remote server`);
	await execInLogmap(
		`mkdir /usr/src/app/data/${requestId} && \
			mkdir /usr/src/app/out/${requestId}`,
	);
	await exec(
		`scp ./uploaded/${requestId}/* ${sshUser}@${logmapUrl}:/usr/src/app/data/${requestId}`,
	);
	console.log(`< Uploaded files to logmap`);
	await execInLogmap(
		//@ts-ignore
		`${JAVA_BINARY} -jar target/logmap-matcher-4.0.jar MATCHER file:/usr/src/app/data/${requestId}/${req.files[0].filename} file:/usr/src/app/data/${requestId}/${req.files[1].filename} /usr/src/app/out/${requestId}/ true`,
	);
	console.log(`>> alignment complete >>`);

	console.log(`>> zipping output`);
	await execInLogmap(`cd ../out && zip -r ${requestId}.zip ${requestId}`);

	await exec(
		`scp ${sshUser}@${logmapUrl}:/usr/src/app/out/${requestId}.zip ./outputs`,
	);

	await fileStore.saveFile(requestId);

	await cleanup(requestId);

	return;
};
