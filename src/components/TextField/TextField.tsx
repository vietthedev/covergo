import type { FC, InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextField: FC<TextFieldProps> = (props) => {
	const { className = "", ...rest } = props;

	return (
		<input className={`border p-2 w-full ${className}`} type="text" {...rest} />
	);
};

export default TextField;
