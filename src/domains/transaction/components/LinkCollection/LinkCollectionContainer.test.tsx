import React from "react";
import { act, fireEvent, render } from "utils/testing-library";

import { LinkCollectionContainer } from "./LinkCollectionContainer";

describe("LinkCollectionContainer", () => {
	const title = "Test Title";
	const description = "Test Description";
	const Component = () => (
		<LinkCollectionContainer title={title} description={description}>
			<p>Test</p>
		</LinkCollectionContainer>
	);

	it("should render children", () => {
		const { getByText, asFragment } = render(<Component />);
		expect(getByText("Test")).toBeInTheDocument();
		expect(asFragment()).toMatchSnapshot();
	});

	it("should show title and description", () => {
		const { getByText } = render(<Component />);
		expect(getByText(title)).toBeInTheDocument();
		expect(getByText(description)).toBeInTheDocument();
	});

	it("should toggle collapse", () => {
		const { getByTestId } = render(<Component />);
		const header = getByTestId("LinkCollectionContainer__header");
		const collapse = getByTestId("LinkCollectionContainer__collapse");

		expect(collapse).toHaveAttribute("aria-hidden", "true");

		act(() => {
			fireEvent.click(header);
		});

		expect(collapse).toHaveAttribute("aria-hidden", "false");
	});
});
