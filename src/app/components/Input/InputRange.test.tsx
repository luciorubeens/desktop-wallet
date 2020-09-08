import React, { useState } from "react";
import { act, fireEvent, render } from "testing-library";

import { InputRange } from "./InputRange";

const properties = {
	value: "5",
	min: 1,
	max: 10,
	step: 1,
};

describe("InputRange", () => {
	it("should render with default value", () => {
		const { asFragment, getByTestId } = render(<InputRange {...properties} />);

		expect(getByTestId("InputCurrency")).toHaveValue("5");
		expect(getByTestId("Range__thumb")).toHaveAttribute("aria-valuenow", "5");
		expect(asFragment()).toMatchSnapshot();
	});

	it("should update the range when changing the input", () => {
		const { getByTestId } = render(<InputRange {...properties} />);
		const input = getByTestId("InputCurrency");

		fireEvent.change(input, { target: { value: "9" } });

		expect(getByTestId("Range__thumb")).toHaveAttribute("aria-valuenow", "9");
		expect(input).toHaveValue("9");
	});

	it("should update the input when changing the range", () => {
		const { getByTestId } = render(<InputRange {...properties} />);
		const thumb = getByTestId("Range__thumb");

		fireEvent.keyDown(thumb, { key: "ArrowRight", code: "ArrowRight" });

		expect(thumb).toHaveAttribute("aria-valuenow", "6");
		expect(getByTestId("InputCurrency")).toHaveValue("6");
	});

	it("should not allow a value greater than the maximum", () => {
		const { getByTestId } = render(<InputRange {...properties} />);
		const input = getByTestId("InputCurrency");

		fireEvent.change(input, { target: { value: "11" } });

		expect(input).toHaveValue("10");
		expect(getByTestId("Range__thumb")).toHaveAttribute("aria-valuenow", "10");
	});

	it("should work with a controlled value", () => {
		let satoshi;
		const Component = () => {
			const [value, setValue] = useState("0.04");
			return (
				<InputRange
					value={value}
					min="0.001"
					max={"0.1"}
					step={0.001}
					onChange={(output) => {
						setValue(output.display);
						satoshi = output.value;
					}}
				/>
			);
		};
		const { getByRole } = render(<Component />);
		const input = getByRole("textbox");

		expect(input).toHaveValue("0.04");
		expect(satoshi).toBe("4000000");

		act(() => {
			fireEvent.input(input, {
				target: {
					value: "abc0.03",
				},
			});
		});

		expect(input).toHaveValue("0.03");
		expect(satoshi).toBe("3000000");
	});
});
