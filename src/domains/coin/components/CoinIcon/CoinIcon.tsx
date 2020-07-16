import Tippy from "@tippyjs/react";
import { Circle } from "app/components/Circle";
import { Icon } from "app/components/Icon";
import { useCoinManifest } from "domains/coin/hooks/use-coin";
import React from "react";
import { Size } from "types";

type Props = {
	coin: string;
	as?: React.ElementType;
	network?: string;
	size?: Size;
	noShadow?: boolean;
	className?: string;
	iconSize?: number;
	showTooltip?: boolean;
};

export const CoinIcon = ({ network, coin, iconSize, className, showTooltip, ...props }: Props) => {
	const manifest = useCoinManifest(coin);
	const networkManifest = network && manifest.networks?.[network];

	const placeholder = {
		iconName: undefined,
		borderClass: "border-theme-neutral-light",
		textClass: "text-theme-neutral",
	};

	const { iconName, borderClass, textClass } = networkManifest || manifest || placeholder;
	const displayName = networkManifest ? `${coin} - ${network}` : coin;

	return (
		<Tippy content={displayName} disabled={!showTooltip || !displayName}>
			<Circle
				aria-label={displayName}
				data-testid="CoinIcon"
				className={className ? className : `${borderClass} ${textClass}`}
				{...props}
			>
				{iconName && <Icon data-testid="CoinIcon__icon" name={iconName} width={iconSize} height={iconSize} />}
			</Circle>
		</Tippy>
	);
};

CoinIcon.defaultProps = {
	showTooltip: true,
};
