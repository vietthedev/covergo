import { AGE_LIMIT, CURRENCY_RATE, PACKAGE_RATE } from "@/common/constants";
import type { InsuranceFieldValues, InsurancePackage } from "@/common/types";

export const calculatePremium = (age: number, currency: string) => {
	const currencyRate = CURRENCY_RATE[currency];

	return 10 * age * currencyRate;
};

export const calculatePackage = (price: number, pkg: InsurancePackage) => {
	return price * PACKAGE_RATE[pkg];
};

export const validateFormValues = (values: InsuranceFieldValues) => {
	const { age } = values;

	if (age > AGE_LIMIT) return false;

	return true;
};
