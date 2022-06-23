import React from "react";
import "./App.css";
import { AlignmentHistory } from './components/AlignmentHistory';
import { OntologyAligner } from './components/OntologyAligner';

const App = () => {
	return (
		<div className='App'>
			<h1>Logmap web interface</h1>
			<OntologyAligner />
			<AlignmentHistory />
		</div>
	);
};

export default App;
