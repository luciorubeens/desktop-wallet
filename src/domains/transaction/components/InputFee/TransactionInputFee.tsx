import { useEnvironmentContext } from "app/contexts";
import React, { forwardRef, useMemo } from "react";

import { InputFee } from "./InputFee";

type Props = {
	coin: string;
	network: string;
	type: string;
	onChange?: (value: string) => void;
};

export const TransactionInputFee = forwardRef<HTMLInputElement, Props>(
	({ coin, network, type, onChange }: Props, ref) => {
		const context = useEnvironmentContext();
		const fees = useMemo(() => context.env.fees().findByType(coin, network, type), [context, coin, network, type]);

		return (
			<InputFee
				// Range does not work with 1e8
				step={0.0001}
				min={fees.min}
				max={fees.max}
				avg={fees.avg}
				ref={ref}
				defaultValue={fees.avg}
				onChange={(output) => onChange?.(output.value)}
			/>
		);
	},
);

TransactionInputFee.displayName = "TransactionInputFee";
