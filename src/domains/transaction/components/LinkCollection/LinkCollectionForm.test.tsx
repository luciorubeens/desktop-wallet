import React from "react";
import { act, fireEvent, render, waitFor } from "utils/testing-library";

import { LinkCollectionForm } from "./LinkCollectionForm";

describe("LinkCollectionForm", () => {
	const options = [
		{
			label: "Example",
			value: "example0",
		},
	];

	it("should add link and clear the form after submitting", async () => {
		const append = jest.fn();
		const { getByTestId, getAllByRole, asFragment } = render(
			<LinkCollectionForm selectOptions={options} itemLabel="example" append={append} />,
		);

		act(() => {
			fireEvent.click(getByTestId("select-list__toggle-button"));
		});

		act(() => {
			fireEvent.click(getAllByRole("option")[0]);
		});

		const valueField = getByTestId("LinkCollectionForm__value");

		act(() => {
			fireEvent.change(valueField, {
				target: {
					value: "testing link",
				},
			});
		});

		const submit = getByTestId("LinkCollectionForm__submit");

		act(() => {
			fireEvent.click(submit);
		});

		await waitFor(() => expect(append).toHaveBeenCalledWith({ type: "example0", value: "testing link" }));

		expect(valueField).toHaveValue("");
		expect(asFragment()).toMatchSnapshot();
	});
});
