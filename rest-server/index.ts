import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { attachIdToRequest } from "./handlers/attachIdToRequest";
import { uploadInputFilesToRequest } from "./handlers/uploadInputFilesToRequest";
import { alignmentHandler } from "./handlers/alignmentHandler";
import { fetchAlignmentHandler } from "./handlers/fetchAlignmentHandler";

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/ping", (req, res) => res.send("pong\n"));

app.get(`/alignment/:alignmentId`, fetchAlignmentHandler);

app.post(
	"/align",
	attachIdToRequest,
	uploadInputFilesToRequest,
	alignmentHandler,
);

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});
