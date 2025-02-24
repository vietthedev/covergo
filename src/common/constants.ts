import type { CountryCurrency, InsurancePackage } from "@/common/types";
import currencies from "@/data/currencies.json";
import packages from "@/data/packages.json";

export const PACKAGE_RATE = packages.reduce(
	(previous, current) =>
		Object.assign(previous, { [current.code]: current.rate }),
	{},
) as Record<InsurancePackage, number>;

export const CURRENCY_RATE = {
	HKD: 1,
	USD: 2,
	AUD: 3,
} as const;

export const COUNTRY_CURRENCY = currencies.reduce<
	Record<string, CountryCurrency>
>(
	(previous, current) =>
		Object.assign(previous, { [current.countryCode]: current.code }),
	{},
);

export const AGE_LIMIT = 100;
