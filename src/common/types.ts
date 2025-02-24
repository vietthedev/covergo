import type { CURRENCY_RATE } from "@/common/constants";

export type InsurancePackage = "standard" | "safe" | "superSafe";

export type Package = {
	id: number;
	code: InsurancePackage;
	rate: number;
};

export type InsuranceFieldValues = {
	name: string;
	age: number;
	country: string;
	package: InsurancePackage;
};

export type CountryCurrency = keyof typeof CURRENCY_RATE;

export type Currency = {
	id: number;
	countryCode: string;
	code: CountryCurrency;
};
