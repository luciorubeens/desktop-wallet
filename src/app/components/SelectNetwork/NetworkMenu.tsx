import { CoinIcon } from "domains/coin/components/CoinIcon";
import { availableNetworksMock } from "domains/coin/data";
import { getCoinExtendedManifest } from "domains/coin/helpers";
import { CoinType } from "domains/coin/models";
import { useCombobox } from "downshift";
import React from "react";

import { NetworkInput } from "./NetworkInput";

const networks = availableNetworksMock;

type CoinWithDisplayName = CoinType & { displayName?: string };

export const NetworkMenu = () => {
	const [value, setValue] = React.useState<string | undefined>(undefined);

	const [items] = React.useState(() =>
		networks.map((network) => {
			const manifest = getCoinExtendedManifest({ coin: network.coin, network: network.network });
			return { ...network, displayName: manifest?.displayName };
		}),
	);

	const {
		selectItem,
		selectedItem,
		getInputProps,
		getMenuProps,
		getComboboxProps,
		getItemProps,
		highlightedIndex,
		setHighlightedIndex,
	} = useCombobox<CoinWithDisplayName | null>({
		items,
		itemToString: (item) => item?.displayName || "",
		onInputValueChange: ({ inputValue }) => {
			if (!inputValue) {
				selectItem(null);
			}
			setValue(inputValue);
		},
	});

	const inputMatchesIndex = React.useMemo(() => {
		if (!value) {
			return [];
		}

		return items
			.map((network, index) => network.displayName?.toLowerCase().startsWith(value.toLowerCase().trim()) && index)
			.filter((i): i is number => {
				return typeof i === "number";
			});
	}, [value, items]);

	const isExactMatch = React.useMemo(() => inputMatchesIndex.length === 1, [inputMatchesIndex]);
	const highlightedItem = React.useMemo(() => (inputMatchesIndex.length ? items[inputMatchesIndex[0]] : undefined), [
		items,
		inputMatchesIndex,
	]);

	React.useEffect(() => {
		if (inputMatchesIndex.length > 0) {
			setHighlightedIndex(inputMatchesIndex[0]);
		}
	}, [inputMatchesIndex, setHighlightedIndex]);

	return (
		<>
			<div {...getComboboxProps()}>
				<NetworkInput
					network={selectedItem}
					suggestion={isExactMatch ? highlightedItem?.displayName : undefined}
					{...getInputProps()}
				/>
			</div>
			<ul {...getMenuProps()}>
				{items.map((item, index) => (
					<li
						className="inline-block pt-6 mr-6 cursor-pointer"
						key={index}
						{...getItemProps({
							item,
							index,
							disabled:
								!selectedItem && inputMatchesIndex.length > 0 && !inputMatchesIndex.includes(index),
						})}
					>
						<CoinIcon network={item.network} coin={item.coin} size="xl" iconSize={26} />
					</li>
				))}
			</ul>
		</>
	);
};
