import { Currency } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { Range } from "app/components/Range";
import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { getTrackBackground } from "react-range";

import { InputCurrency } from "./InputCurrency";
import { InputGroup } from "./InputGroup";

export type DisplayValue = {
	display: string;
	value: string;
};

type Props = {
	value: string;
	min: string | number;
	max: string | number;
	step: number;
	name?: string;
	magnitude?: number;
	onChange?: (output: DisplayValue) => void;
};

export const InputRange = React.forwardRef<HTMLInputElement, Props>(
	({ step, value, magnitude, onChange, ...props }: Props, ref) => {
		const [displayValue, setDisplayValue] = useState<DisplayValue>();
		const human = BigNumber.make(displayValue?.display || value);
		const max = useMemo(() => BigNumber.make(props.max), [props.max]);
		const min = BigNumber.make(props.min);
		const rangeValues = [human.toNumber()];

		const updateDisplayValue = useCallback(
			(value: string) => {
				const output = Currency.fromString(value, magnitude);
				setDisplayValue(output);
				onChange?.(output);
			},
			[onChange, magnitude],
		);

		const handleInput = (output: DisplayValue) => {
			if (max.isLessThan(output.display)) {
				return updateDisplayValue(max.toString());
			}
			setDisplayValue(output);
			onChange?.(output);
		};

		const handleRange = (values: number[]) => {
			const output = Currency.fromString(values[0].toString(), magnitude);
			setDisplayValue(output);
			onChange?.(output);
		};

		useLayoutEffect(() => {
			updateDisplayValue(value);
		}, [updateDisplayValue, value]);

		return (
			<InputGroup>
				<InputCurrency
					style={{
						background: getTrackBackground({
							values: rangeValues,
							colors: ["rgba(var(--theme-color-primary-rgb), 0.1)", "transparent"],
							min: min.toNumber(),
							max: max.toNumber(),
						}),
					}}
					magnitude={magnitude}
					type="text"
					value={human.toString()}
					ref={ref}
					onChange={handleInput}
				/>
				{max.isGreaterThan(min) && (
					<div className="absolute bottom-0 w-full px-1">
						<Range
							colors={["var(--theme-color-primary)", "transparent"]}
							step={step}
							min={min.toNumber()}
							max={max.toNumber()}
							onChange={handleRange}
							values={rangeValues}
						/>
					</div>
				)}
			</InputGroup>
		);
	},
);

InputRange.displayName = "InputRange";
InputRange.defaultProps = {
	magnitude: 8,
};
