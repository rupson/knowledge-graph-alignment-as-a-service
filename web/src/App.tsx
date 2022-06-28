import React from "react";
import "./App.css";
import { AlignmentHistory } from "./components/AlignmentHistory";
import { FetchAlignment } from './components/FetchAlignment';
import { OntologyAligner } from "./components/OntologyAligner";
import { AlignmentsProvider } from "./context/alignmentContext";

const App = () => {
	return (
		<div className='App'>
			<h1>Knowledge graph alignment as a service</h1>
			<AlignmentsProvider>
				<OntologyAligner />
				<FetchAlignment />
				<AlignmentHistory />
			</AlignmentsProvider>
		</div>
	);
};

export default App;
