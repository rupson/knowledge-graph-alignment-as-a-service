import express from "express";
import cors from 'cors'
import bodyParser from 'body-parser'
import { execInSsh } from "./sshHelpers";

const JAVA_BINARY = `/opt/java/openjdk/bin/java`

const ensureIsDefined = (
	maybeUndefined: Array<unknown>,
	options: { otherwise: Function },
): maybeUndefined is Array<string> => {
	if (maybeUndefined.every((entry) => !!entry)) {
		return true;
	}
	options.otherwise(maybeUndefined);
	return false
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

app.use(cors())
app.use(bodyParser.json())

app.get('/ping', (req, res) => res.send('pong\n'))

app.post("/align", async (req, res) => {
	console.log(`>>>> received req`)
	await execInLogmap(
		`${JAVA_BINARY} -jar target/logmap-matcher-4.0.jar MATCHER file:/usr/src/app/data/human.owl file:/usr/src/app/data/mouse.owl /usr/src/app/out/ true`,
	);
	console.log(`>> alignment complete >>`);
	const result = await execInLogmap(`cat ../out/logmap2_mappings.txt`);

	return res.status(200).send({ result });
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
