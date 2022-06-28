import React from "react";
import axios from "axios";
import { useAlignmentContext } from "../context/alignmentContext";

type Ontology = unknown;

const uploadOntologiesToServer = async (
	ontologies: [Ontology | undefined, Ontology | undefined],
	setApiCallState: (newState: ApiCallState) => void,
	setAlignmentId: (id: string) => void,
) => {
	if (ontologies[0] === undefined || ontologies[1] === undefined) {
		setApiCallState("missing_ontologies");
		return;
	}
	setApiCallState("loading");
	const formData = new FormData();
	formData.append("ontologies", ontologies[0] as File);
	formData.append("ontologies", ontologies[1] as File);
	try {
		const { data } = await axios.post<{ alignmentId: string }>(
			`${process.env.REACT_APP_LOGMAP_API_URL}/align` || "",
			formData,
			{ headers: { "Content-type": "multipart/form-data" } },
		);
		setApiCallState("complete");
		setAlignmentId(data.alignmentId);
	} catch (err) {
		console.error(err);
		setApiCallState("server_error");
	}
};

const OntologyUploader: React.FC<{
	setOntology: (ontology: Ontology) => void;
}> = ({ setOntology }) => {
	return (
		<input
			type='file'
			onChange={(e) => {
				setOntology(e.target.files?.item(0));
			}}
			style={{
				border: "solid 1px salmon",
				borderStyle: "dashed",
				padding: "40px",
				margin: "5px",
			}}
		/>
	);
};

const OntologiesUploaders: React.FC<{
	ontologies: [Ontology | undefined, Ontology | undefined];
	setOntologies: (
		ontologies: [Ontology | undefined, Ontology | undefined],
	) => void;
}> = ({ ontologies, setOntologies }) => {
	return (
		<div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
			<OntologyUploader
				setOntology={(ontology: Ontology) =>
					setOntologies([ontology, ontologies[1]])
				}
			/>
			<OntologyUploader
				setOntology={(ontology: Ontology) =>
					setOntologies([ontologies[0], ontology])
				}
			/>
		</div>
	);
};

type ApiCallErrorStates = "missing_ontologies" | "server_error";
type ApiCallState = "none" | "loading" | "complete" | ApiCallErrorStates;
export const OntologyAligner: React.FC = () => {
	const [ontologies, setOntologies] = React.useState<
		[Ontology | undefined, Ontology | undefined]
	>([undefined, undefined]);

	const [apiCallState, setApiCallState] = React.useState<ApiCallState>("none");

	const { currentAlignmentId, setCurrentAlignmentId } = useAlignmentContext();

	return (
		<div
			style={{
				margin: "auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				border: "dotted 1px grey",
				padding: "50px",
				width: "max-content",
			}}
		>
			<h2 style={{ marginTop: "0px" }}>Align ontologies with Logmap</h2>
			<OntologiesUploaders
				ontologies={ontologies}
				setOntologies={setOntologies}
			/>
			<button
				type='submit'
				style={{ textAlign: "center" }}
				onClick={(e) => {
					uploadOntologiesToServer(
						ontologies,
						setApiCallState,
						setCurrentAlignmentId,
					);
				}}
			>
				Align with logmap
			</button>
			<div>
				{apiCallState === "complete" &&
					`Alignment has been started with alignment id ${currentAlignmentId}`}
				{apiCallState === "loading" && `Starting alignment with Logmap...`}
				{apiCallState === "missing_ontologies" &&
					`Please upload two ontologies for alignment`}
				{apiCallState === "server_error" &&
					`Call to kgas-api has failed. Contact maintainers if problem persists.`}
			</div>
		</div>
	);
};
