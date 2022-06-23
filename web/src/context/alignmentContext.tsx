import React from "react";
import { getAlignmentHistory } from "../helpers/alignmentHistory";

type AlignmentContextType = {
	alignmentList: Array<string>;
	currentAlignmentId: string | undefined;
	setCurrentAlignmentId: (id: string) => void;
};

const AlignmentContext = React.createContext<AlignmentContextType | undefined>(
	undefined,
);

export const AlignmentsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentAlignmentId, setCurrentAlignmentId] = React.useState<
		string | undefined
	>(undefined);

	const [alignmentList, setAlignmentList] = React.useState<Array<string>>(
		getAlignmentHistory(),
	);

	React.useEffect(() => {
		console.log(`>>currentAlignmentId>>`, currentAlignmentId);
		if (!currentAlignmentId) {
			setAlignmentList(getAlignmentHistory());
			return;
		}
		if (alignmentList.includes(currentAlignmentId)) {
			return;
		}
		setAlignmentList([currentAlignmentId, ...alignmentList]);
	}, [currentAlignmentId]);

	React.useEffect(() => {
		console.log(`>>alignmentList>>`, alignmentList);
		localStorage.setItem("alignment_history", alignmentList.join(";"));
	}, [alignmentList]);

	return (
		<AlignmentContext.Provider
			value={{ currentAlignmentId, setCurrentAlignmentId, alignmentList }}
		>
			{children}
		</AlignmentContext.Provider>
	);
};

export const useAlignmentContext = () => {
	const ctx = React.useContext(AlignmentContext);
	if (ctx === undefined) {
		throw new Error(
			`useAlignmentContext must be used within an AlignmentProvider`,
		);
	}
	return ctx;
};
