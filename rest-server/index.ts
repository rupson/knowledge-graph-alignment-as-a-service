import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import { exec, execInSsh } from "./sshHelpers";
import { Request } from "express-serve-static-core";

// const upload = multer({ dest: "uploaded_3" });
const upload = (destinationDir: string) =>
	multer({ dest: `uploaded/${destinationDir}` });

const JAVA_BINARY = `java`;

const ensureIsDefined = (
	maybeUndefined: Array<unknown>,
	options: { otherwise: Function },
): maybeUndefined is Array<string> => {
	if (maybeUndefined.every((entry) => !!entry)) {
		return true;
	}
	options.otherwise(maybeUndefined);
	return false;
};

const { LOGMAP_URL: logmapUrl, SSH_USER: sshUser } = process.env;

ensureIsDefined([logmapUrl, sshUser], {
	otherwise: () => {
		console.error(`Required env vars not supplied. Unable to start app.`);
		process.exit();
	},
});

const execInLogmap = execInSsh(sshUser as string, logmapUrl as string);

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/ping", (req, res) => res.send("pong\n"));

app.use("/align", (req, _, next) => {
	Object.assign(req, { requestId: uuidv4() });
	next();
});

type AlignmentRequest = Request & { requestId: string };

const hasRequestId = <TReq extends Request>(
	req: TReq,
	//@ts-ignore
): req is AlignmentRequest => Object.keys(req).includes("requestId");

app.post(
	"/align",
	(req, res, next) =>
		upload((req as AlignmentRequest).requestId).array("ontologies")(
			req,
			res,
			next,
		),
	async (req, res) => {
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
	},
);

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
