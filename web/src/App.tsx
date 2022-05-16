import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const callServer = async () => {
	console.log(`>>> calling server`);
	const { data } = await axios.post(
		// `${process.env.REACT_APP_LOGMAP_API_URL}/align` || "",
    `http://localhost:4000/align`, {}, {}
	);
	console.log(`>>> data >>`, data);
};

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>Hello world!</p>
				<button onClick={callServer}>call server</button>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
