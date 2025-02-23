import ButtonBase from "@/components/Buttons/ButtonBase";
import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonPrimaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonPrimary: FC<ButtonPrimaryProps> = (props) => {
	const { className = "", ...rest } = props;

	return (
		<ButtonBase
			className={`bg-black hover:bg-white text-white hover:text-black ${className}`}
			{...rest}
		/>
	);
};

export default ButtonPrimary;
