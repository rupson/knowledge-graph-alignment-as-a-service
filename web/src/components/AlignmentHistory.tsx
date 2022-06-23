import axios from "axios";
import React from "react";
import { getAlignmentHistory } from "../helpers/alignmentHistory";

type Alignment = { url: string };
type AlignmentState =
	| { state: "loading" }
	| { state: "not-found"; reason: unknown }
	| { state: "data"; alignment: Alignment };

const fetchAlignment = async (
	id: string,
	setAlignmentState: (newState: AlignmentState) => void,
) => {
	try {
		const response = await axios.get<{ url: string }>(
			`${process.env.REACT_APP_LOGMAP_API_URL}/alignment/${id}`,
		);
		setAlignmentState({ state: "data", alignment: { url: response.data.url } });
	} catch (err) {
		setAlignmentState({ state: "not-found", reason: err });
	}
};

const AlignmentStatus: React.FC<{ alignmentId: string }> = ({
	alignmentId,
}) => {
	const [alignmentState, setAlignmentState] = React.useState<AlignmentState>({
		state: "loading",
	});

	React.useEffect(() => {
		fetchAlignment(alignmentId, setAlignmentState);
	}, [alignmentId]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
        border: "solid 1px grey",
        boxShadow: "black 1px 1px",
        margin: "3px",
        padding: "20px"
			}}
		>
			<span>{alignmentId}</span>
			<div>
				{alignmentState.state === "loading" && "Loading"}
				{alignmentState.state === "not-found" &&
					"No data available for alignment"}
				{alignmentState.state === "data" && "Alignment complete"}
			</div>
			{alignmentState.state === "data" && (
				<div>
					<a href={alignmentState.alignment.url}>Download</a>
				</div>
			)}
		</div>
	);
};

export const AlignmentHistory: React.FC = () => {
	const alignmentIds = getAlignmentHistory();

	return (
		<div>
			<h2>Alignment History</h2>
      {alignmentIds.length === 0 && <div>No alignments to show</div>}
			{alignmentIds.map((id) => (
				<AlignmentStatus alignmentId={id} />
			))}
		</div>
	);
};
