import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonBase: FC<ButtonBaseProps> = (props) => {
	const { className = "", ...rest } = props;

	return (
		<button
			className={`bg-white hover:bg-slate-50 border px-10 py-2 ${className}`}
			type="button"
			{...rest}
		/>
	);
};

export default ButtonBase;
