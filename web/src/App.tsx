import React from "react";
import "./App.css";
import axios from "axios";

const callServer = async () => {
	console.log(`>>> calling server`);
	const { data } = await axios.post(
		// `${process.env.REACT_APP_LOGMAP_API_URL}/align` || "",
		`http://localhost:4000/align`,
		{},
		{},
	);
	console.log(`>>> data >>`, data);
};

const OntologyUploader: React.FC = () => {
	return (
		<input
			type='file'
			style={{
				border: "solid 1px salmon",
				borderStyle: "dashed",
				padding: "40px",
			}}
		/>
	);
};

const OntologiesUploaders: React.FC = () => {
	return (
		<div
			style={{ display: "flex", justifyContent: "space-around", width: "100%" }}
		>
			<OntologyUploader />
			<OntologyUploader />
		</div>
	);
};

const OntologyAligner: React.FC = () => {
	const [ontologies, setOntologies] = React.useState([undefined, undefined]);
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
			<OntologiesUploaders />
			<button type='submit'>Align with logmap</button>
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
