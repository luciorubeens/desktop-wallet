import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { act, fireEvent, render } from "utils/testing-library";

import { LinkCollectionTable } from "./LinkCollectionTable";

describe("LinkCollectionTable", () => {
	const options = [
		{
			type: "facebook",
			value: "https://facebook.com",
		},
		{
			type: "instagram",
			value: "https://instagram.com",
		},
		{
			type: "twitter",
			value: "https://twitter.com",
		},
	];

	it("should display default links", () => {
		const Component = () => {
			const name = "example";
			const { control, register } = useForm({
				defaultValues: {
					example: options,
				},
				mode: "onChange",
			});

			const { fields, remove } = useFieldArray({
				control,
				name,
				keyName: "value",
			});

			return <LinkCollectionTable remove={remove} registerRef={register} fields={fields as any} name={name} />;
		};

		const { getAllByTestId, asFragment } = render(<Component />);

		expect(getAllByTestId("LinkCollectionTable__row")).toHaveLength(3);
		expect(asFragment()).toMatchSnapshot();
	});

	it("should delete link from DOM and form", () => {
		let currentValues: any[] = [];

		const Component = () => {
			const name = "example";
			const { control, register, watch } = useForm({
				defaultValues: {
					example: options,
				},
				mode: "onChange",
			});
			currentValues = watch(name);

			const { fields, remove } = useFieldArray({
				control,
				name,
				keyName: "value",
			});

			return <LinkCollectionTable remove={remove} registerRef={register} fields={fields as any} name={name} />;
		};

		const { getAllByTestId, asFragment } = render(<Component />);

		expect(getAllByTestId("LinkCollectionTable__row")).toHaveLength(3);

		act(() => {
			fireEvent.click(getAllByTestId("LinkCollectionTable__remove-link")[0]);
		});

		expect(getAllByTestId("LinkCollectionTable__row")).toHaveLength(2);
		expect(currentValues).toEqual([
			{ type: "facebook", value: "https://facebook.com" },
			{ type: "instagram", value: "https://instagram.com" },
		]);
		expect(asFragment()).toMatchSnapshot();
	});

	describe("With Options", () => {
		const Component = ({
			optionChecked,
			onOptionChange,
		}: {
			optionChecked?: number;
			onOptionChange?: (data: any) => void;
		}) => {
			const name = "example";
			const { control, register } = useForm({
				defaultValues: {
					example: options,
				},
				mode: "onChange",
			});

			const { fields, remove } = useFieldArray({
				control,
				name,
				keyName: "value",
			});

			return (
				<LinkCollectionTable
					optionsTypes={["facebook", "instagram"]}
					optionsTypesTitle="Avatar"
					optionChecked={optionChecked}
					onOptionChange={onOptionChange}
					remove={remove}
					registerRef={register}
					fields={fields as any}
					name={name}
				/>
			);
		};

		it("should show with options column", () => {
			const { getAllByTestId, asFragment } = render(<Component />);

			expect(getAllByTestId("LinkCollectionTable__row__option")).toHaveLength(2);
			expect(asFragment()).toMatchSnapshot();
		});

		it("should show checked option", () => {
			const { getAllByTestId, asFragment } = render(<Component optionChecked={1} />);

			expect(getAllByTestId("LinkCollectionTable__row__option")[0]).not.toBeChecked();
			expect(getAllByTestId("LinkCollectionTable__row__option")[1]).toBeChecked();
			expect(asFragment()).toMatchSnapshot();
		});

		it("should emit event on change", () => {
			const onOptionChange = jest.fn();
			const { getAllByTestId, asFragment } = render(
				<Component optionChecked={1} onOptionChange={onOptionChange} />,
			);

			fireEvent.click(getAllByTestId("LinkCollectionTable__row__option")[0]);

			expect(onOptionChange).toHaveBeenCalledWith({ type: "facebook", value: "https://facebook.com" });
			expect(asFragment()).toMatchSnapshot();
		});
	});
});
