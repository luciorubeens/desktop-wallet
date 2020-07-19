import { CoinType } from "./models";

export interface CoinExtendedManifest {
	displayName: string;
	borderClass: string;
	textClass: string;
	iconName: string;
	networks?: Record<string, CoinExtendedManifest>;
}

export const coinsExtendedManifest: Record<string, CoinExtendedManifest> = {
	ARK: {
		displayName: "Ark",
		borderClass: "border-theme-danger-light",
		textClass: "text-theme-danger-400",
		iconName: "Ark",
		networks: {
			Devnet: {
				displayName: "ARK Devnet",
				borderClass: "border-theme-primary-100",
				textClass: "text-theme-primary-400",
				iconName: "Ark",
			},
		},
	},
	BTC: {
		displayName: "Bitcoin",
		borderClass: "border-theme-warning-200",
		textClass: "text-theme-warning-400",
		iconName: "Bitcoin",
	},
	ETH: {
		displayName: "Ethereum",
		borderClass: "border-theme-neutral-600",
		textClass: "text-theme-neutral-800",
		iconName: "Ethereum",
	},
	LSK: {
		displayName: "Lisk",
		borderClass: "border-theme-primary-400",
		textClass: "text-theme-primary",
		iconName: "Lisk",
	},
	XRP: {
		displayName: "Ripple",
		borderClass: "border-theme-primary-500",
		textClass: "text-theme-primary-dark",
		iconName: "Ripple",
	},
};

export const availableNetworksMock: CoinType[] = [
	{
		coin: "ARK",
		network: "Mainnet",
		symbol: "Ѧ",
		ticker: "ARK",
	},
	{
		coin: "ARK",
		network: "Devnet",
		symbol: "DѦ",
		ticker: "DARK",
	},
	{
		coin: "BTC",
		network: "Livenet",
		symbol: "Ƀ",
		ticker: "BTC",
	},
	{
		coin: "LSK",
		network: "Mainnet",
		ticker: "LSK",
		symbol: "LSK",
	},
	{
		coin: "XRP",
		network: "Mainnet",
		ticker: "XRP",
		symbol: "XRP",
	},
];
