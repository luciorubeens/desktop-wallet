import { CoinExtendedManifest } from "../data";
import { getCoinExtendedManifest } from "../helpers";

export const useCoinManifest = ({
	coin,
	network,
}: {
	coin: string;
	network?: string;
}): CoinExtendedManifest | undefined => {
	// TODO: Merge with SDK's manifest
	const extended = getCoinExtendedManifest({ coin, network });

	return extended;
};
