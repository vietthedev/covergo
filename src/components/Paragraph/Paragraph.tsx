import type { FC, HTMLAttributes } from "react";

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {}

const Paragraph: FC<ParagraphProps> = (props) => {
	const { className = "", ...rest } = props;

	return <p className={`py-2 ${className}`} {...rest} />;
};

export default Paragraph;
