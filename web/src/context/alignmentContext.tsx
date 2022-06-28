import React from "react";
import { getAlignmentHistory } from "../helpers/alignmentHistory";

type AlignmentContextType = {
	alignmentList: Array<string>;
	currentAlignmentId: string | undefined;
	setCurrentAlignmentId: (id: string) => void;
	addAlignment: (id: string) => void;
	removeAlignment: (id: string) => void;
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
		if (!currentAlignmentId) {
			setAlignmentList(getAlignmentHistory());
			return;
		}
		if (alignmentList.includes(currentAlignmentId)) {
			return;
		}
		setAlignmentList([currentAlignmentId, ...alignmentList]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentAlignmentId]);

	React.useEffect(() => {
		localStorage.setItem("alignment_history", alignmentList.join(";"));
	}, [alignmentList]);

	const addAlignment = (alignmentId: string) => {
		setAlignmentList([alignmentId, ...alignmentList]);
	};

	const removeAlignment = (alignmnetId: string) => {
		setAlignmentList(alignmentList.filter((id) => alignmnetId !== id));
	};

	return (
		<AlignmentContext.Provider
			value={{
				currentAlignmentId,
				setCurrentAlignmentId,
				alignmentList,
				addAlignment,
				removeAlignment,
			}}
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
