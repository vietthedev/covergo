import Box from "@/components/Box";
import Paper from "@/components/Paper";
import Title from "@/components/Title";
import type { FC, ReactNode } from "react";

export interface WizardProps {
	activePage: number;
	pages: {
		id: string;
		header: string;
		content: ReactNode;
		footer: ReactNode;
	}[];
}

const Wizard: FC<WizardProps> = (props) => {
	const { activePage, pages } = props;
	const { content, footer, header } = pages[activePage];

	return (
		<Paper>
			<Box className="mb-6">
				<Title>{header}</Title>
			</Box>
			<Box className="mb-6">{content}</Box>
			<Box className="mb-6">{footer}</Box>
		</Paper>
	);
};

export default Wizard;
