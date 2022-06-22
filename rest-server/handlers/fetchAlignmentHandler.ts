import { RequestHandler } from "express";
import { getBlobProperties } from "../azure";

export const fetchAlignmentHandler: RequestHandler<{
	alignmentId: string;
}> = async (req, res, next) => {
	const { alignmentId } = req.params;

	const properties = await getBlobProperties(alignmentId);

	if (!properties) {
		return res.status(404).send({ message: "Not found", alignmentId });
	}

	return res
		.status(200)
		.send({ message: "blob found", url: properties._response.request.url });
};
