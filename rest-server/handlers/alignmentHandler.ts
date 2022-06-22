import { Request } from "express-serve-static-core";
import { RequestHandler } from "express";
import { AlignmentRequest } from "../types";
import { getConfig } from '../environemt';
import { execInSsh, exec } from '../sshHelpers';

const hasRequestId = <TReq extends Request>(
	req: TReq,
	//@ts-ignore
): req is AlignmentRequest => Object.keys(req).includes("requestId");

const JAVA_BINARY = `java`;
const { logmapUrl, sshUser } = getConfig();

const execInLogmap = execInSsh(sshUser, logmapUrl);

export const alignmentHandler: RequestHandler = async (req, res) => {
	if (!hasRequestId(req)) throw new Error(`missing request id`);
	console.log(`>>incoming request `, {
		requestId: req.requestId,
		files: req.files,
	});

	const { requestId } = req;

	console.log(`>>copying files to remote server`);
	await execInLogmap(
		`mkdir /usr/src/app/data/${requestId} && \
			mkdir /usr/src/app/out/${requestId}`,
	);
	await exec(
		`scp ./uploaded/${requestId}/* rob@logmap:/usr/src/app/data/${requestId}`,
	);
	console.log(`< Uploaded files to logmap`);
	await execInLogmap(
		//@ts-ignore
		`${JAVA_BINARY} -jar target/logmap-matcher-4.0.jar MATCHER file:/usr/src/app/data/${requestId}/${req.files[0].filename} file:/usr/src/app/data/${requestId}/${req.files[1].filename} /usr/src/app/out/${requestId}/ true`,
	);
	console.log(`>> alignment complete >>`);
	const result = await execInLogmap(
		`cat ../out/${requestId}/logmap2_mappings.txt`,
	);

	res.status(200).send({ result });

	await execInLogmap(`
		rm -rf /usr/src/app/out/${requestId} && \
		rm -rf /usr/src/app/out/${requestId}`);

	return;
};
