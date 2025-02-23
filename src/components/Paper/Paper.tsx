import type { FC, HTMLAttributes } from "react";

interface PaperProps extends HTMLAttributes<HTMLDivElement> {}

const Paper: FC<PaperProps> = (props) => {
	const { className = "", ...rest } = props;

	return <div className={`bg-gray-100 px-32 py-16 ${className}`} {...rest} />;
};

export default Paper;
