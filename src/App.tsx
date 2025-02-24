import {
	type ChangeEvent,
	type MouseEventHandler,
	useRef,
	useState,
} from "react";

import { COUNTRY_CURRENCY, PACKAGE_RATE } from "@/common/constants";
import {
	calculatePackage,
	calculatePremium,
	validateFormValues,
} from "@/common/helpers";
import type {
	Currency,
	InsuranceFieldValues,
	InsurancePackage,
	Package,
} from "@/common/types";
import Box from "@/components/Box";
import ButtonBase from "@/components/Buttons/ButtonBase";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import Paragraph from "@/components/Paragraph";
import Select from "@/components/Select";
import TextField from "@/components/TextField";
import Wizard, { type WizardProps } from "@/components/Wizard";
import useTranslate from "@/hooks/useTranslate";

import countries from "@/data/countries.json";
import currencies from "@/data/currencies.json";
import packages from "@/data/packages.json";

const countryOptions = countries.map(({ code, id, name }) => (
	<option key={id} value={code}>
		{name}
	</option>
));

const App = () => {
	const { t } = useTranslate();
	const [activePage, setActivePage] = useState(0);
	const formRef = useRef<HTMLFormElement | null>(null);
	const [formData, setFormData] = useState<InsuranceFieldValues>({
		name: "",
		age: 1,
		country: "HKG",
		package: "standard",
	});
	const currency =
		(currencies as Currency[]).find(
			({ code }) => code === COUNTRY_CURRENCY[formData.country],
		)?.code ?? "HKD";
	const premium = calculatePackage(
		calculatePremium(formData.age, COUNTRY_CURRENCY[formData.country]),
		formData.package,
	);
	const generatePackageLabel = (code: InsurancePackage) => {
		const label = t(`insurancePackage.${code}`);

		if (code === "standard") return label;

		return `${label} (+${
			calculatePremium(formData.age, currency) * (PACKAGE_RATE[code] - 1)
		} ${currency}, ${(PACKAGE_RATE[code] - 1) * 100}%)`;
	};

	const handleFieldChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const handleSubmit = (formData: FormData) => {
		const values: InsuranceFieldValues = {
			age: Number.parseInt(formData.get("age")?.toString() ?? "0"),
			country: formData.get("country")?.toString() ?? "",
			name: formData.get("name")?.toString() ?? "",
			package:
				(formData.get("package")?.toString() as InsurancePackage) ?? "standard",
		};

		if (validateFormValues(values)) {
			setActivePage((prevPage) => prevPage + 1);
			return;
		}

		setActivePage(pages.length - 1);
	};

	const handleReset = () => {
		setFormData({
			age: 1,
			country: "HKG",
			name: "",
			package: "standard",
		});
		setActivePage(0);
	};

	const handleNextClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		formRef.current?.requestSubmit();
	};

	const pages: WizardProps["pages"] = [
		{
			id: "1",
			header: t("title.helloThere"),
			content: <Paragraph>{t("message.letsBuySomeInsurance")}</Paragraph>,
			footer: (
				<ButtonPrimary
					key="1"
					onClick={() => setActivePage((prevPage) => prevPage + 1)}
				>
					{t("button.start")}
				</ButtonPrimary>
			),
		},
		{
			id: "2",
			header: t("title.tellUsAboutYourself"),
			content: (
				<Box className="flex flex-col gap-4 items-start">
					<label className="text-left" htmlFor="name">
						{t("label.name")}
						<TextField
							id="name"
							name="name"
							placeholder={t("placeholder.addText")}
							required
							value={formData.name}
							onChange={handleFieldChange}
						/>
					</label>
					<label className="text-left" htmlFor="age">
						{t("label.age")}
						<TextField
							id="age"
							min="1"
							name="age"
							placeholder={t("placeholder.addNumber")}
							required
							type="number"
							value={formData.age}
							onChange={handleFieldChange}
						/>
					</label>
					<label className="text-left" htmlFor="country">
						{t("label.whereDoYouLive")}
						<Select
							id="country"
							name="country"
							value={formData.country}
							onChange={handleFieldChange}
						>
							{countryOptions}
						</Select>
					</label>
					<Box className="flex flex-col gap-2 items-start">
						{(packages as Package[]).map(({ code, id }) => (
							<label key={id} className="text-left">
								<input
									className="mr-2"
									checked={code === formData.package}
									name="package"
									type="radio"
									value={code}
									onChange={handleFieldChange}
								/>
								{generatePackageLabel(code)}
							</label>
						))}
					</Box>
					<Box>
						<Paragraph className="font-bold">
							{t("label.yourPremiumIs")} {premium}
							{currency}
						</Paragraph>
					</Box>
				</Box>
			),
			footer: (
				<Box key="2" className="flex gap-2">
					<ButtonBase onClick={() => setActivePage((prevPage) => prevPage - 1)}>
						{t("button.back")}
					</ButtonBase>
					<ButtonPrimary type="submit" onClick={handleNextClick}>
						{t("button.next")}
					</ButtonPrimary>
				</Box>
			),
		},
		{
			id: "3",
			header: t("title.summary"),
			content: (
				<Box>
					<Paragraph>
						{t("label.name")}: {formData.name}
					</Paragraph>
					<Paragraph>
						{t("label.age")}: {formData.age}
					</Paragraph>
					<Paragraph>
						{t("label.whereDoYouLive")}:{" "}
						{countries.find(({ code }) => code === formData.country)?.name}
					</Paragraph>
					<Paragraph>
						{t("label.package")}: {t(`insurancePackage.${formData.package}`)}
					</Paragraph>
					<Paragraph>
						{t("label.premium")}: {premium}
						{currency}
					</Paragraph>
				</Box>
			),
			footer: (
				<Box key="3" className="flex gap-2">
					<ButtonBase onClick={() => setActivePage((prevPage) => prevPage - 1)}>
						{t("button.back")}
					</ButtonBase>
					<ButtonPrimary type="submit" onClick={handleReset}>
						{t("button.buy")}
					</ButtonPrimary>
				</Box>
			),
		},
		{
			id: "4",
			header: t("title.ooops"),
			content: (
				<Paragraph>{t("message.yourAgeIsOverOurAcceptedLimit")}</Paragraph>
			),
			footer: (
				<ButtonPrimary key="4" type="button" onClick={handleReset}>
					{t("button.ok")} :(
				</ButtonPrimary>
			),
		},
	];

	return (
		<form action={handleSubmit} ref={formRef}>
			<Wizard activePage={activePage} pages={pages} />
		</form>
	);
};

export default App;
