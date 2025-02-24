import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "@/App";

describe(App.name, () => {
	it("should be able to proceed through a successful flow", async () => {
		const user = userEvent.setup();

		render(<App />);

		expect(screen.getByText("title.helloThere")).toBeDefined();

		await user.click(screen.getByRole("button", { name: "button.start" }));
		await user.type(screen.getByRole("textbox", { name: "Name" }), "John");
		await user.clear(screen.getByRole("spinbutton", { name: "Age" }));
		await user.type(screen.getByRole("spinbutton", { name: "Age" }), "50");

		expect(screen.getByText("Your premium is: 500HKD")).toBeDefined();

		await user.click(screen.getByRole("button", { name: "Next" }));

		expect(screen.getByText("Summary")).toBeDefined();
		expect(screen.getByText("Name: John")).toBeDefined();
		expect(screen.getByText("Age: 50")).toBeDefined();
		expect(screen.getByText("Where do you live: Hong Kong")).toBeDefined();
		expect(screen.getByText("Package: Standard")).toBeDefined();
		expect(screen.getByText("Premium: 500HKD")).toBeDefined();
	});

	it("should direct the user to the error page if age is over 100", async () => {
		const user = userEvent.setup();

		render(<App />);

		await user.click(screen.getByRole("button", { name: "button.start" }));
		await user.type(screen.getByRole("textbox", { name: "Name" }), "John");
		await user.clear(screen.getByRole("spinbutton", { name: "Age" }));
		await user.type(screen.getByRole("spinbutton", { name: "Age" }), "101");
		await user.click(screen.getByRole("button", { name: "Next" }));

		expect(screen.getByText("Ooops")).toBeDefined();
	});
});
