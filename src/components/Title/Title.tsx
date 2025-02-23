import type { FC, HTMLAttributes } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const Title: FC<TitleProps> = (props) => {
	const { className = "", ...rest } = props;

	return <h2 className={`font-bold mb-6 text-xl ${className}`} {...rest} />;
};

export default Title;
