import React from "react";
import axios from "axios";
import { useAlignmentContext } from "../context/alignmentContext";

type Ontology = unknown;

const uploadOntologiesToServer = async (
	ontologies: [Ontology, Ontology],
	setApiCallState: (newState: ApiCallState) => void,
	setAlignmentId: (id: string) => void,
) => {
	setApiCallState("loading");
	const formData = new FormData();
	formData.append("ontologies", ontologies[0] as File);
	formData.append("ontologies", ontologies[1] as File);
	const { data } = await axios.post<{ alignmentId: string }>(
		`${process.env.REACT_APP_LOGMAP_API_URL}/align` || "",
		formData,
		{ headers: { "Content-type": "multipart/form-data" } },
	);
	setApiCallState("complete");
	setAlignmentId(data.alignmentId);
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

type ApiCallState = "none" | "loading" | "complete";
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
			</div>
		</div>
	);
};
