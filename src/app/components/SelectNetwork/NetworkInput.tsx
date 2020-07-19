import { CoinIcon } from "domains/coin/components/CoinIcon";
import { CoinType } from "domains/coin/models";
import React from "react";

import { Input, InputAddon, InputAddonStart, InputGroup } from "../Input";

type Props = {
	network?: CoinType;
	suggestion?: string;
} & React.InputHTMLAttributes<any>;

const TypeSuggestion = ({ value }: { value?: string }) => {
	return (
		<InputAddon className="border border-transparent pl-15 py-3 opacity-50 pointer-events-none">{value}</InputAddon>
	);
};

export const NetworkInput = React.forwardRef<HTMLInputElement, Props>(
	({ network, suggestion, ...props }: Props, ref) => {
		return (
			<InputGroup>
				<InputAddonStart className="px-4">
					<CoinIcon coin={network?.coin || ""} network={network?.network} size="sm" showTooltip={false} />
				</InputAddonStart>
				<TypeSuggestion value={suggestion} />
				<Input ref={ref} className="pl-15" {...props} />
			</InputGroup>
		);
	},
);

NetworkInput.displayName = "NetworkInput";
