interface CoinExtendedManifestStruct {
	borderClass: string;
	textClass: string;
	iconName: string;
	networks?: Record<string, CoinExtendedManifestStruct>;
}

export const CoinExtendedManifest: Record<string, CoinExtendedManifestStruct> = {
	ARK: {
		borderClass: "border-theme-danger-light",
		textClass: "text-theme-danger-400",
		iconName: "Ark",
		networks: {
			Devnet: {
				borderClass: "border-theme-primary-100",
				textClass: "text-theme-primary-400",
				iconName: "Ark",
			},
		},
	},
	Bitcoin: {
		borderClass: "border-theme-warning-200",
		textClass: "text-theme-warning-400",
		iconName: "Bitcoin",
	},
	Ethereum: {
		borderClass: "border-theme-neutral-600",
		textClass: "text-theme-neutral-800",
		iconName: "Ethereum",
	},
	Lisk: {
		borderClass: "border-theme-primary-400",
		textClass: "text-theme-primary",
		iconName: "Lisk",
	},
	Ripple: {
		borderClass: "border-theme-primary-500",
		textClass: "text-theme-primary-dark",
		iconName: "Ripple",
	},
};
