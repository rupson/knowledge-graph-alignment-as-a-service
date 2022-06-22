import multer from "multer";
import { RequestHandler } from "express";
import { AlignmentRequest } from "../types";

const upload = (destinationDir: string) =>
	multer({ dest: `uploaded/${destinationDir}` });

export const uploadInputFilesToRequest: RequestHandler = (req, res, next) =>
	upload((req as AlignmentRequest).requestId).array("ontologies")(
		req,
		res,
		next,
	);
