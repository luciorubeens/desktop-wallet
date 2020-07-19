import { coinsExtendedManifest } from "./data";

export const getCoinExtendedManifest = ({ coin, network }: { coin: string; network?: string }) => {
	const coinExtendManifest = coinsExtendedManifest[coin];

	if (!coinExtendManifest) {
		return;
	}

	const networkManifest = network ? coinExtendManifest?.networks?.[network] : undefined;
	const manifest = Object.assign({}, coinExtendManifest, networkManifest);

	return manifest;
};
