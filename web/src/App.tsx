import React from "react";
import "./App.css";
import { AlignmentHistory } from "./components/AlignmentHistory";
import { OntologyAligner } from "./components/OntologyAligner";
import { AlignmentsProvider } from "./context/alignmentContext";

const App = () => {
	return (
		<div className='App'>
			<h1>Logmap web interface</h1>
			<AlignmentsProvider>
				<OntologyAligner />
				<AlignmentHistory />
			</AlignmentsProvider>
		</div>
	);
};

export default App;
