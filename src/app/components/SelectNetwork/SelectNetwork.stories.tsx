import React from "react";

import { SelectNetwork } from "./SelectNetwork";

export default {
	title: "App / Components / SelectNetwork",
};

export const Default = () => {
	const networks = [
		{
			coin: "ARK",
			name: "ARK Ecosystem",
		},
		{
			coin: "Bitcoin",
			name: "Bitcoin",
		},
		{
			coin: "Ethereum",
			name: "Ethereum",
		},
		{
			coin: "Lisk",
			name: "Lisk",
		},
		{
			coin: "Ripple",
			name: "Ripple",
		},
	];

	return (
		<div className="p-5 w-128">
			<SelectNetwork networks={networks} />
		</div>
	);
};
