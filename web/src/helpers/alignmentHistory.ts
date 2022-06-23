export const getAlignmentHistory = () => {
	const alignments = localStorage.getItem("alignment_history");
	return alignments ? alignments.split(";") : [];
	// (localStorage.getItem("alignment_history") || "").split(";");}
};

export const addNewAlignment = (alignmentId: string) => {
	const newAlignmentIds = [alignmentId, ...getAlignmentHistory()];
	localStorage.setItem("alignment_history", newAlignmentIds.join(";"));
};
