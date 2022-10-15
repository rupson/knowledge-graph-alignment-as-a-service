import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { attachIdToRequest } from './handlers/attachIdToRequest';
import { uploadInputFilesToRequest } from './handlers/uploadInputFilesToRequest';
import { alignmentHandler } from './handlers/alignmentHandler';
import { fetchAlignmentHandler } from './handlers/fetchAlignmentHandler';
import { config } from './config';
import { outputFileExistsWithId } from './storage/localFileStore';

const app = express();
const port = process.env.PORT || 80;

app.use(cors());
app.use(bodyParser.json());

app.get('/ping', (req, res) => res.send('pong\n'));

app.get(`/alignment/:alignmentId`, fetchAlignmentHandler);

app.post(
	'/align',
	attachIdToRequest,
	uploadInputFilesToRequest,
	alignmentHandler,
);

app.get(`/download/:alignmentId`, (req, res, next) => {
	const { storageMethod } = config;
	console.log(`>>> received req for file`);
	if (storageMethod !== 'local') {
		return res.status(500).send({
			message: `This route is not compatible with the current storage mode. Current storage mode is ${storageMethod}`,
		});
	}
	const { alignmentId } = req.params;
	if (!outputFileExistsWithId(alignmentId))
		return res.status(404).send({ message: `Requested file does not exist!` });
	console.log(`>>> sending file /usr/src/app/outputs/${alignmentId}.zip`);
	return res.sendFile(`/usr/src/app/outputs/${alignmentId}.zip`);
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
