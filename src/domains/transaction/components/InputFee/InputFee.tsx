import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { DisplayValue, InputRange } from "app/components/Input";
import { SelectionBar, SelectionBarOption, useSelectionState } from "app/components/SelectionBar";
import React, { forwardRef, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";

type InputFeeProps = {
	defaultValue?: string; // Satoshi
	value?: string; // Display value
	min: string;
	avg: string;
	max: string;
	step: number;
	magnitude?: number;
	onChange?: (output: DisplayValue) => void;
};

export const InputFee = forwardRef<HTMLInputElement, InputFeeProps>(
	({ onChange, step, magnitude, ...props }: InputFeeProps, ref) => {
		const { t } = useTranslation();

		const defaultValue = BigNumber.make(props.defaultValue || "0");
		const min = BigNumber.make(props.min);
		const max = BigNumber.make(props.max);
		const avg = BigNumber.make(props.avg);

		const feeControl = useSelectionState(defaultValue.toHuman());
		const { setCheckedValue } = feeControl;

		useLayoutEffect(() => {
			if (props.value) {
				setCheckedValue(props.value);
			}
		}, [props.value, magnitude, setCheckedValue]);

		const handleInput = (output: DisplayValue) => {
			setCheckedValue(output.display);
			onChange?.(output);
		};

		return (
			<div data-testid="InputFee" className="flex space-x-2">
				<div className="flex-1">
					<InputRange
						name="fee"
						value={feeControl.checkedValue as string}
						min={min.toHuman(magnitude)}
						max={max.toHuman(magnitude)}
						step={step}
						onChange={handleInput}
						ref={ref}
					/>
				</div>
				<div>
					<SelectionBar>
						<SelectionBarOption value={min.toHuman(magnitude)} {...feeControl}>
							{t("TRANSACTION.FEES.MIN")}
						</SelectionBarOption>

						<SelectionBarOption value={avg.toHuman(magnitude)} {...feeControl}>
							{t("TRANSACTION.FEES.AVERAGE")}
						</SelectionBarOption>

						<SelectionBarOption value={max.toHuman(magnitude)} {...feeControl}>
							{t("TRANSACTION.FEES.MAX")}
						</SelectionBarOption>
					</SelectionBar>
				</div>
			</div>
		);
	},
);

InputFee.displayName = "InputFee";
