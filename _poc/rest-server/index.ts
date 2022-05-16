import express from "express";
import child_process from "child_process";
import util from "util";

const app = express();
const port = 3000;

// class OutputWrapper {
// 	public value: string;

// 	constructor() {
// 		this.value = "";
// 	}

// 	public captureCommandOutput: Parameters<typeof child_process.exec>[2] = (
// 		error,
// 		stdout,
// 		stdin,
// 	) => {
// 		typeof stdout === "string"
// 			? (this.value = stdout.trim())
// 			: (this.value = "fuck");
// 	};
// }

const exec = util.promisify(child_process.exec);

// const captureCommandOutput: Parameters<typeof child_process.exec>[2] = (
// 	error,
// 	stdout,
// 	stdin,
// ) => (typeof stdout === "string" ? stdout.trim() : null);

app.get("/double", async (req, res) => {
	const num = req.query.num;

	// const outputBucket = new OutputWrapper();

	const result = await exec(
		`ssh -o StrictHostKeyChecking=no rob@doubler "python ./app ${num}"`,
		{},
		// outputBucket.captureCommandOutput,
	).then(({ stdout }) => Number(stdout.trim()));

	return res.status(200).send({ result });
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
