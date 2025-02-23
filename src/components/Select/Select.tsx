import type { FC, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

const Select: FC<SelectProps> = (props) => {
	const { className = "", ...rest } = props;

	return <select className={`border p-2 w-full ${className}`} {...rest} />;
};

export default Select;
