import express from 'express';
import child_process from 'child_process';
import util from 'util';

const app = express();
const port = 3000;

const exec = util.promisify(child_process.exec);

app.get('/double', async (req, res) => {
	const num = req.query.num;

	const result = await exec(
		`ssh -o StrictHostKeyChecking=no rob@doubler "python ./app ${num}"`,
		{},
	).then(({ stdout }) => Number(stdout.trim()));

	return res.status(200).send({ result });
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
