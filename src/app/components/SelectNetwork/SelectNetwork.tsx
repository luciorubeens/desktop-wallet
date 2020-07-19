import { useEnvironment } from "app/contexts";
import { CoinIcon } from "domains/coin/components/CoinIcon";
import { CoinType } from "domains/coin/models";
import Downshift from "downshift";
import React from "react";
import { styled } from "twin.macro";

type SelectNetworkProps = {
	networks: CoinType[];
	placeholder?: string;
	name?: string;
	value?: string;
	onSelect?: (network: any) => void;
};

type InputValue = any;

const TypeAhead = ({ input, matches }: any) => {
	const formatTypeHeadToMatchInputCase = (network: CoinType, input: InputValue) => {
		return [input, network?.coin.slice(input.length)].join("");
	};

	const typeaheadFormatted = matches.length === 1 ? formatTypeHeadToMatchInputCase(matches[0], input) : "";

	return (
		<div className="relative z-10 w-full" data-testid={`select-network__typeahead-${typeaheadFormatted}`}>
			<div className="absolute left-0 font-semibold top-2 text-theme-neutral-light">{typeaheadFormatted}</div>
		</div>
	);
};

const InputWrapper = styled.div`
	&:hover {
		box-shadow: 0 0 0 1px var(--theme-color-primary);
	}
`;

export const SelectNetwork = ({ networks, placeholder, onSelect, name }: SelectNetworkProps) => {
	const isMatch = (network: CoinType, input: InputValue) => {
		if (!input) {
			return false;
		}

		return network.coin.toLowerCase().startsWith(input.toLowerCase());
	};

	const getMatches = (networks: CoinType[], input: InputValue) => {
		return networks.filter((network: CoinType) => isMatch(network, input));
	};

	const assetClassName = (network: CoinType, selectedAsset?: CoinType, input?: InputValue) => {
		// Selected is me. Show me green
		if (selectedAsset && selectedAsset.coin === network.coin && selectedAsset.network === network.network) {
			return "text-theme-success-500 border-theme-success-200";
		}

		// Selection is made but not me. Show me disabled
		if (selectedAsset && selectedAsset.coin !== network.coin && selectedAsset.network !== network.network) {
			return "text-theme-neutral-light";
		}

		// Initial state. Nothing entered, nothing selected
		if (!input) {
			return undefined;
		}

		// Input entered, matching with input. Show normal colors
		if (isMatch(network, input)) {
			return undefined;
		}

		// Disabled otherwise
		return "text-theme-neutral-light";
	};

	return (
		<Downshift itemToString={(i) => i?.coin} onSelect={onSelect}>
			{({
				getLabelProps,
				getInputProps,
				getItemProps,
				getMenuProps,
				selectItem,
				inputValue,
				selectedItem,
				clearSelection,
			}) => (
				<div className="relative">
					<label {...getLabelProps()} />
					<div className="relative flex items-center w-full flex-inline">
						<InputWrapper className="flex w-full border rounded transition-colors duration-200 bg-theme-background border-theme-neutral-300 hover:outline-none hover:border-theme-primary">
							<div className="px-4 py-2 flex-0 w-14">
								<CoinIcon
									data-testid="select-asset__selected"
									showTooltip={false}
									size="sm"
									coin={selectedItem?.coin}
									network={selectedItem?.name}
								/>
							</div>
							<div className="relative flex-1 p-1 font-semibold text-theme-neutral-800">
								<TypeAhead input={inputValue} matches={getMatches(networks, inputValue)} />
								<input
									name={name}
									{...getInputProps({
										value: inputValue || "",
										placeholder,
										onKeyDown: (event: any) => {
											if (event.key === "Tab" || event.key === "Enter") {
												// Selected if exact match
												const matches = getMatches(networks, inputValue);
												if (matches.length === 1) {
													selectItem(matches[0]);
												}
												event.preventDefault();
												return;
											}

											// Clear selection when user is changing input,
											// and input does is not exact match with previously selected item
											if (selectedItem && selectedItem.name !== inputValue) {
												clearSelection();
											}
										},
									})}
									data-testid="select-asset__input"
									className="relative z-20 w-full h-full font-semibold bg-transparent outline-none"
								/>
							</div>
						</InputWrapper>
					</div>
					{networks && networks.length > 0 && (
						<div data-testid="select-asset__items" className="select-asset__items" {...getMenuProps()}>
							{networks.map((network: CoinType, index: number) => {
								return (
									<div
										key={index}
										className="inline-block pt-6 mr-6 cursor-pointer"
										{...getItemProps({ item: network })}
									>
										<CoinIcon
											iconSize={26}
											size="xl"
											network={network.network}
											coin={network.coin}
											className={assetClassName(network, selectedItem, inputValue)}
										/>
									</div>
								);
							})}
						</div>
					)}
				</div>
			)}
		</Downshift>
	);
};

export const SelectNetworkContainer = (props: SelectNetworkProps) => {
	const env = useEnvironment();
	const networks = React.useMemo(() => env?.availableNetworks(), [env]);

	return <SelectNetwork {...props} networks={networks} />;
};

SelectNetwork.defaultProps = {
	networks: [],
	placeholder: "Enter a network name",
};
