import React from "react";
import { Control, useFieldArray, ValidationRules } from "react-hook-form";

import { EntityLink } from "./LinkCollection.models";
import { LinkCollectionContainer } from "./LinkCollectionContainer";
import { LinkCollectionForm } from "./LinkCollectionForm";
import { LinkCollectionTable } from "./LinkCollectionTable";

type Props = {
	selectOptions: { label: string; value: string }[];
	itemLabel: string;
	title: string;
	description: string;
	name: string;
	registerRef: (options?: ValidationRules) => (ref: HTMLInputElement | null) => void;
	control: Control<Record<string, any>>;

	checkOptionsNames?: string[];
	checkColumnTitle?: string;
	onChecked?: (index: number) => void;
	checkedIndex?: number;
};

export const LinkCollection = ({
	selectOptions,
	title,
	description,
	name,
	registerRef,
	control,
	itemLabel,
	checkColumnTitle,
	checkOptionsNames,
	checkedIndex,
	onChecked,
}: Props) => {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
		keyName: "value",
	});

	return (
		<>
			<LinkCollectionContainer title={title} description={description}>
				<LinkCollectionForm append={append} selectOptions={selectOptions} itemLabel={itemLabel} />

				{fields.length ? (
					<>
						<p
							data-testid="LinkCollection__label"
							className="mt-8 mb-2 text-sm text-theme-neutral-dark font-semibold"
						>
							Your {itemLabel}
						</p>
						<LinkCollectionTable
							remove={remove}
							fields={fields as EntityLink[]}
							name={name}
							registerRef={registerRef}
							checkColumnTitle={checkColumnTitle}
							checkOptionsNames={checkOptionsNames}
							checkedIndex={checkedIndex}
							onChecked={onChecked}
						/>
					</>
				) : (
					React.Fragment
				)}
			</LinkCollectionContainer>
		</>
	);
};
