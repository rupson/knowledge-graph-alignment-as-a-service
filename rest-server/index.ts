import express from "express";
import child_process from "child_process";
import util from "util";

const { LOGMAP_URL: logmapUrl, SSH_USER: sshUser } = process.env;

const app = express();
const port = 3000;

const exec = util.promisify(child_process.exec);

app.post("/align", async (req, res) => {
	await exec(
		`
      ssh -o StrictHostKeyChecking=no ${sshUser}@${logmapUrl} "java -jar target/logmap-matcher-4.0.jar MATCHER file:/usr/src/app/data/human.owl file:/usr/src/app/data/mouse.owl /usr/src/app/out/ true"
    `,
		{},
	);
	console.log(`>> alignment complete >>`);
	const result = await exec(
		`
    ssh -o StrictHostKeyChecking=no ${sshUser}@${logmapUrl} "cat ../out/logmap2_mappings.txt"
    `,
	);

	return res.status(200).send({ result });
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
