import React from "react";
import "./App.css";
import axios from "axios";

type Ontology = unknown;

const callServer = async (ontologies: [Ontology, Ontology]) => {
	console.log(`>>> calling server`);
	const formData = new FormData();
	formData.append("ontologies", ontologies[0] as File);
	formData.append("ontologies", ontologies[1] as File);
	const { data } = await axios.post(
		// `${process.env.REACT_APP_LOGMAP_API_URL}/align` || "",
		`http://localhost:4000/align`,
		formData,
		{ headers: { "Content-type": "multipart/form-data" } },
	);
	console.log(`>>> data >>`, data);
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

const OntologyAligner: React.FC = () => {
	const [ontologies, setOntologies] = React.useState<
		[Ontology | undefined, Ontology | undefined]
	>([undefined, undefined]);

	React.useEffect(() => {
		console.log(`>>OntologyAligner::useEffect::ontologies>>`, ontologies);
	}, ontologies);

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
					callServer(ontologies);
				}}
			>
				Align with logmap
			</button>
		</div>
	);
};

const App = () => {
	return (
		<div className='App'>
			<h1>Logmap web interface</h1>
			<OntologyAligner />
		</div>
	);
};

export default App;
