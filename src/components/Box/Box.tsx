import type { FC, HTMLAttributes } from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {}

const Box: FC<BoxProps> = (props) => {
	return <div {...props} />;
};

export default Box;
