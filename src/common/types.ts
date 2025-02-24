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
