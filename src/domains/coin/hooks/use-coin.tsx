import { CoinExtendedManifest } from "../data";

export const useCoinManifest = (name: string) => {
	// TODO: Merge with SDK's manifest

	return CoinExtendedManifest[name];
};
