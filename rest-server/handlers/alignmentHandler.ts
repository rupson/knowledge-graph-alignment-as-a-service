import { Request } from "express-serve-static-core";
import { RequestHandler } from "express";
import { AlignmentRequest } from "../types";
import { getConfig } from "../environemt";
import { execInSsh, exec } from "../sshHelpers";
import { uploadToAzure } from "../azure";

const hasRequestId = (req: Request): req is AlignmentRequest =>
	Object.keys(req).includes("requestId");

const JAVA_BINARY = `java`;
const { logmapUrl, sshUser } = getConfig();

const execInLogmap = execInSsh(sshUser, logmapUrl);

const cleanup = (requestId: string) =>
	Promise.all([
		execInLogmap(`
    rm -rf /usr/src/app/out/${requestId} && \
    rm /usr/src/app/out/${requestId}.zip && \
    rm -rf /usr/src/app/data/${requestId}
    `),
		exec(`
    rm -rf /usr/src/app/outputs/${requestId} && \
    rm /usr/src/app/outputs/${requestId}.zip
    `),
	]);

export const alignmentHandler: RequestHandler = async (req, res) => {
	if (!hasRequestId(req)) throw new Error(`missing request id`);
	console.log(`>>incoming request `, {
		requestId: req.requestId,
		files: req.files,
	});

	const { requestId } = req;

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

	await execInLogmap(`cd ../out && zip -r ${requestId}.zip ${requestId}`);

	await exec(
		`scp ${sshUser}@${logmapUrl}:/usr/src/app/out/${requestId}.zip ./outputs`,
	);

	await uploadToAzure(requestId);

	await cleanup(requestId);

	return;
};
