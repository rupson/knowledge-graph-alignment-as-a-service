import React from "react";
import { useAlignmentContext } from "../context/alignmentContext";

export const FetchAlignment: React.FC = () => {
	const [id, setId] = React.useState("");
	const { addAlignment } = useAlignmentContext();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				border: "dotted 1px grey",
				width: "max-content",
				margin: "20px auto",
				padding: '50px'
			}}
		>
			<h2 style={{marginTop: '0px'}}>Look up alignment by id</h2>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<input type='text' value={id} onChange={(e) => setId(e.target.value)} />
				<input
					type='button'
					onClick={() => addAlignment(id)}
					value={"Fetch alignment output"}
				/>
			</div>
		</div>
	);
};
