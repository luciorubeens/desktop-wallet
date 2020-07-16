import React from "react";
import { render } from "utils/testing-library";

import { CoinIcon } from "./CoinIcon";

describe("CoinIcon", () => {
	it("should render coin", () => {
		const { getByTestId } = render(<CoinIcon coin="ARK" />, {});
		expect(getByTestId("CoinIcon")).toHaveAttribute("aria-label", "ARK");
		expect(getByTestId("CoinIcon__icon")).toBeTruthy();
	});

	it("should render network", () => {
		const { getByTestId } = render(<CoinIcon coin="ARK" network="Devnet" />, {});
		expect(getByTestId("CoinIcon")).toHaveAttribute("aria-label", "ARK - Devnet");
		expect(getByTestId("CoinIcon__icon")).toBeTruthy();
	});

	it("should render placeholder", () => {
		const { queryByTestId } = render(<CoinIcon coin="TEST" />, {});
		expect(queryByTestId("CoinIcon__icon")).toBeNull();
	});
});
