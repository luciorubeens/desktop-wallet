import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { render } from "utils/testing-library";

import { LinkCollection } from "./LinkCollection";

const types = [
	{
		label: "Facebook",
		value: "facebook",
	},
	{
		label: "Twitter",
		value: "twitter",
	},
	{
		label: "Instagram",
		value: "instagram",
	},
];

describe("LinkCollection", () => {
	it("should render without fields", () => {
		const { result } = renderHook(() => useForm());
		const { control, register } = result.current;

		const { asFragment, getByTestId, queryByTestId } = render(
			<LinkCollection
				title="Social Media"
				description="Tell people more about yourself through social media"
				selectOptions={types}
				name="socialMedia"
				itemLabel="media"
				registerRef={register}
				control={control}
			/>,
		);

		expect(getByTestId("LinkCollectionContainer")).toBeInTheDocument();
		expect(getByTestId("LinkCollectionForm")).toBeInTheDocument();
		expect(queryByTestId("LinkCollectionTable")).not.toBeInTheDocument();
		expect(asFragment()).toMatchSnapshot();
	});

	it("should render with fields", () => {
		const { result } = renderHook(() =>
			useForm({
				defaultValues: {
					socialMedia: [
						{
							type: "facebook",
							value: "https://facebook.com",
						},
						{
							type: "instagram",
							value: "https://instagram.com",
						},
					],
				},
			}),
		);
		const { control, register } = result.current;

		const { asFragment, getByTestId, queryByTestId } = render(
			<LinkCollection
				title="Social Media"
				description="Tell people more about yourself through social media"
				selectOptions={types}
				name="socialMedia"
				itemLabel="media"
				registerRef={register}
				control={control}
			/>,
		);

		expect(getByTestId("LinkCollectionContainer")).toBeInTheDocument();
		expect(getByTestId("LinkCollectionForm")).toBeInTheDocument();
		expect(getByTestId("LinkCollection__label")).toBeInTheDocument();
		expect(getByTestId("LinkCollectionTable")).toBeInTheDocument();
		expect(asFragment()).toMatchSnapshot();
	});
});
