import { availableNetworksMock } from "domains/coin/data";
import React from "react";
import { act, fireEvent, render } from "utils/testing-library";

import { SelectNetwork } from "./SelectNetwork";

describe("SelectNetwork", () => {
	it("should render", () => {
		const { container } = render(<SelectNetwork />);
		expect(container).toMatchSnapshot();
	});

	it("should render with networks", () => {
		const { container } = render(<SelectNetwork networks={availableNetworksMock} />);
		expect(container).toMatchSnapshot();
	});

	it("should show typeahead when typing has found one exact match", () => {
		const { getByTestId } = render(<SelectNetwork networks={availableNetworksMock} />);
		const input = getByTestId("select-asset__input");
		act(() => {
			fireEvent.change(input, { target: { value: "Bitco" } });
		});

		expect(getByTestId("select-network__typeahead-Bitcoin")).toBeTruthy();
	});

	it("should select first matching asset with enter", () => {
		const { getByTestId } = render(<SelectNetwork networks={availableNetworksMock} />);
		const input = getByTestId("select-asset__input");
		act(() => {
			fireEvent.change(input, { target: { value: "Bitco" } });
		});

		act(() => {
			fireEvent.keyDown(input, { key: "Enter", code: 13 });
		});

		expect(getByTestId("select-asset__selected")).toHaveAttribute("aria-label", "Bitcoin");
	});

	it("should select first matching asset with tab", () => {
		const { getByTestId } = render(<SelectNetwork networks={availableNetworksMock} />);
		const input = getByTestId("select-asset__input");
		act(() => {
			fireEvent.change(input, { target: { value: "Bitcoi" } });
		});

		act(() => {
			fireEvent.keyDown(input, { key: "Tab", code: 9 });
		});

		expect(getByTestId("select-asset__selected")).toHaveAttribute("aria-label", "Bitcoin");
	});

	it("should not select non-matching asset after key input and tab", () => {
		const { getByTestId, queryByTestId } = render(<SelectNetwork networks={availableNetworksMock} />);
		const input = getByTestId("select-asset__input");
		act(() => {
			fireEvent.change(input, { target: { value: "Bot" } });
		});

		act(() => {
			fireEvent.keyDown(input, { key: "Tab", code: 9 });
		});

		expect(queryByTestId("select-asset__selected-Bitcoin")).not.toBeTruthy();
	});

	it("should not select first matched asset after random key enter", () => {
		const { getByTestId, queryByTestId } = render(<SelectNetwork networks={availableNetworksMock} />);
		const input = getByTestId("select-asset__input");

		act(() => {
			fireEvent.change(input, { target: { value: "Bitco" } });
		});

		act(() => {
			fireEvent.keyDown(input, { key: "A", code: 65 });
		});

		expect(queryByTestId("select-asset__selected-Bitcoin")).not.toBeTruthy();
	});

	it("should clear selection when changing input", () => {
		const { getByTestId, queryByTestId } = render(<SelectNetwork networks={availableNetworksMock} />);
		const input = getByTestId("select-asset__input");

		act(() => {
			fireEvent.change(input, { target: { value: "Bitcoin" } });
		});

		act(() => {
			fireEvent.keyDown(input, { key: "Enter", code: 13 });
		});

		expect(getByTestId("select-asset__selected")).toBeTruthy();

		act(() => {
			fireEvent.change(input, { target: { value: "test" } });
		});

		act(() => {
			fireEvent.keyDown(input, { key: "A", code: 65 });
		});
		act(() => {
			fireEvent.keyDown(input, { key: "B", code: 65 });
		});

		expect(queryByTestId("select-asset__selected")).not.toHaveAttribute("aria-label");
	});
});
