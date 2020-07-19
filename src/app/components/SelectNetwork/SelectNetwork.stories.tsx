import { availableNetworksMock } from "domains/coin/data";
import React from "react";

import { NetworkMenu } from "./NetworkMenu";
import { SelectNetwork } from "./SelectNetwork";

export default {
	title: "App / Components / SelectNetwork",
};

export const Default = () => {
	return (
		<div className="p-5 w-128">
			<SelectNetwork networks={availableNetworksMock} />
		</div>
	);
};

export const Input = () => {
	return (
		<div className="p-5">
			<NetworkMenu />
		</div>
	);
};
