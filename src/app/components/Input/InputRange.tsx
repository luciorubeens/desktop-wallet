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
	({ step, magnitude, onChange, ...props }: Props, ref) => {
		const [displayValue, setDisplayValue] = useState<DisplayValue>();
		const value = displayValue?.display || props.value;
		const human = BigNumber.make(value);
		const max = useMemo(() => BigNumber.make(props.max), [props.max]);
		const min = BigNumber.make(props.min);
		const rangeValues = [human.toNumber()];

		const convertToCurrency = useCallback((valueString: string) => Currency.fromString(valueString, magnitude), [
			magnitude,
		]);

		const handleInput = (output: DisplayValue) => {
			if (max.isLessThan(output.display)) {
				output = convertToCurrency(max.toString());
				return;
			}
			setDisplayValue(output);
			onChange?.(output);
		};

		const handleRange = (values: number[]) => {
			const output = convertToCurrency(values[0].toString());
			setDisplayValue(output);
			onChange?.(output);
		};

		useLayoutEffect(() => {
			setDisplayValue(convertToCurrency(props.value));
		}, [convertToCurrency, props.value]);

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
					value={value}
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
