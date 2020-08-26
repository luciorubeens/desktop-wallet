import { Collapse } from "app/components/Collapse";
import { Icon } from "app/components/Icon";
import React, { useState } from "react";

const CollapseToggleIcon = ({ isExpanded }: { isExpanded?: boolean }) =>
	isExpanded ? (
		<Icon
			name="ChevronUp"
			width={10}
			height={10}
			className="flex items-center justify-center w-5 h-5 text-white rounded-full bg-theme-primary"
		/>
	) : (
		<Icon
			name="ChevronDown"
			width={10}
			height={10}
			className="flex items-center justify-center w-5 h-5 rounded-full text-theme-primary bg-theme-primary-contrast"
		/>
	);

type Props = {
	defaultIsExpanded?: false;
	title: string;
	description: string;
	children: React.ReactNode;
};

export const LinkCollectionContainer = ({ defaultIsExpanded, title, description, children }: Props) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(defaultIsExpanded!);

	return (
		<div data-testid="LinkCollectionContainer">
			<div
				data-testid="LinkCollectionContainer__header"
				className="flex items-center justify-between cursor-pointer"
				onClick={() => setIsExpanded((prev) => !prev)}
			>
				<span className="text-lg font-semibold">{title}</span>

				<div data-testid="LinkCollectionContainer__collapse-toggle">
					<CollapseToggleIcon isExpanded={isExpanded} />
				</div>
			</div>

			<p data-testid="LinkCollectionContainer__description" className="mt-2 text-theme-neutral-dark">
				{description}
			</p>

			<Collapse data-testid="LinkCollectionContainer__collapse" isOpen={isExpanded}>
				<div className="mt-4">{children}</div>
			</Collapse>
		</div>
	);
};
