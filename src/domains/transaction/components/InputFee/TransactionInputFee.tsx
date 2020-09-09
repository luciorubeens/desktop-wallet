import { ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import { DisplayValue } from "app/components/Input";
import { useEnvironmentContext } from "app/contexts";
import React, { forwardRef, useState } from "react";

import { InputFee } from "./InputFee";

type Props = {
	wallet: ReadWriteWallet;
	type: string;
	onChange?: (value: string) => void;
};

export const TransactionInputFee = forwardRef<HTMLInputElement, Props>(({ wallet, type, onChange }: Props, ref) => {
	const context = useEnvironmentContext();
	const fees = context.env.fees().findByType(wallet.coinId(), wallet.networkId(), type);

	const [value, setValue] = useState(fees.avg);

	const handleChange = (output: DisplayValue) => {
		setValue(output.display);
		onChange?.(output.value);
	};

	return (
		<InputFee
			step={0.01}
			min={fees.min}
			max={fees.max}
			avg={fees.avg}
			ref={ref}
			value={value}
			onChange={handleChange}
		/>
	);
});

TransactionInputFee.displayName = "TransactionInputFee";
