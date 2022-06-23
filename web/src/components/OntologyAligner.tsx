import React from "react";
import axios from "axios";
import { addNewAlignment } from "../helpers/alignmentHistory";

type Ontology = unknown;

const LOADING_TEXT = `PENDING...`;

const uploadOntologiesToServer = async (
	ontologies: [Ontology, Ontology],
	setAlignmentId: (id: string) => void,
) => {
	console.log(`>>> calling server`);
	setAlignmentId(LOADING_TEXT);
	const formData = new FormData();
	formData.append("ontologies", ontologies[0] as File);
	formData.append("ontologies", ontologies[1] as File);
	const { data } = await axios.post<{ alignmentId: string }>(
		`${process.env.REACT_APP_LOGMAP_API_URL}/align` || "",
		formData,
		{ headers: { "Content-type": "multipart/form-data" } },
	);
	console.log(`>>> data >>`, data);
	setAlignmentId(data.alignmentId);
};

const OntologyUploader: React.FC<{
	setOntology: (ontology: Ontology) => void;
}> = ({ setOntology }) => {
	return (
		<input
			type='file'
			onChange={(e) => {
				console.log(`>>fileInput::changeEvent>>`, e);
				setOntology(e.target.files?.item(0));
			}}
			style={{
				border: "solid 1px salmon",
				borderStyle: "dashed",
				padding: "40px",
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
		<div
			style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
		>
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

export const OntologyAligner: React.FC = () => {
	const [ontologies, setOntologies] = React.useState<
		[Ontology | undefined, Ontology | undefined]
	>([undefined, undefined]);
	const [alignmentId, setAlignmentId] = React.useState<string | undefined>(
		undefined,
	);

	React.useEffect(() => {
		if (!alignmentId || alignmentId === LOADING_TEXT) {
			return;
		}
		addNewAlignment(alignmentId);
	}, [alignmentId]);

	return (
		<div
			style={{
				margin: "auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<h2>Align ontologies with Logmap</h2>
			<OntologiesUploaders
				ontologies={ontologies}
				setOntologies={setOntologies}
			/>
			<button
				type='submit'
				onClick={(...args) => {
					console.log(`>>onClick::args>>`, args);
					uploadOntologiesToServer(ontologies, setAlignmentId);
				}}
			>
				Align with logmap
			</button>
			<div>{alignmentId && `Alignment ID: ${alignmentId}`}</div>
		</div>
	);
};
