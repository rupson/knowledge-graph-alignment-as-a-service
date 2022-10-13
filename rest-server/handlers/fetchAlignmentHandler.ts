import { RequestHandler } from 'express';
import { getBlobProperties } from '../azure';
import { getFileStore } from '../storage';

export const fetchAlignmentHandler: RequestHandler<{
	alignmentId: string;
}> = async (req, res, next) => {
	const { alignmentId } = req.params;
	const fileStore = getFileStore();

	// const properties = await getBlobProperties(alignmentId);
	const properties = await fileStore.getFileProperties(alignmentId);

	if (!properties) {
		return res.status(404).send({ message: 'Not found', alignmentId });
	}

	return res.status(200).send({ message: 'blob found', url: properties.url });
};
