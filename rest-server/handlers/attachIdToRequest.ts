import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";

export const attachIdToRequest: RequestHandler = (req, _res, next) => {
	Object.assign(req, { requestId: uuidv4() });
	next();
};
