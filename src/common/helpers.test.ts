import {
	calculatePackage,
	calculatePremium,
	validateFormValues,
} from "@/common/helpers";

describe(calculatePremium.name, () => {
	it("should calculate premium correctly", () => {
		expect(calculatePremium(50, "HKD")).toEqual(500);
		expect(calculatePremium(50, "USD")).toEqual(1000);
		expect(calculatePremium(50, "AUD")).toEqual(1500);
	});
});

describe(calculatePackage.name, () => {
	it("should calculate insurance package correctly", () => {
		expect(calculatePackage(500, "standard")).toEqual(500);
		expect(calculatePackage(500, "safe")).toEqual(750);
		expect(calculatePackage(500, "superSafe")).toEqual(875);
	});
});

describe(validateFormValues.name, () => {
	it("should return valid for age less than or equal to 100", () => {
		expect(
			validateFormValues({
				age: 50,
				country: "",
				name: "",
				package: "standard",
			}),
		).toEqual(true);
	});

	it("should return invalid for age greater than 100", () => {
		expect(
			validateFormValues({
				age: 101,
				country: "",
				name: "",
				package: "standard",
			}),
		).toEqual(false);
	});
});
