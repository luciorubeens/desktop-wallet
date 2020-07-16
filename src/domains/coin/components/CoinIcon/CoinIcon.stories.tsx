import { CoinExtendedManifest } from "domains/coin/data";
import React from "react";

import { CoinIcon } from "./CoinIcon";

export default { title: "Domains / Coin / Components / CoinIcon" };

const coins = Object.entries(CoinExtendedManifest);

export const Default = () => (
	<div className="flex space-x-2">
		{coins.map(([name, coin]) => (
			<div className="flex space-x-2" key={name}>
				<CoinIcon coin={name} />
				{coin.networks &&
					Object.keys(coin.networks).map((networkName) => (
						<CoinIcon key={networkName} coin={name} network={networkName} />
					))}
			</div>
		))}
	</div>
);
