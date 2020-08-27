import { Button } from "app/components/Button";
import { Icon } from "app/components/Icon";
import { RadioButton } from "app/components/RadioButton";
import { Table } from "app/components/Table";
import React from "react";
import { ValidationRules } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { EntityLink } from "./LinkCollection.models";

type Props = {
	name: string;
	fields: EntityLink[];
	remove: (index: number) => void;
	registerRef: (options?: ValidationRules) => (ref: HTMLInputElement | null) => void;

	optionsTypes?: string[];
	optionsTypesTitle?: string;
	onOptionChange?: (link: EntityLink) => void;
	optionChecked?: number;
};

export const LinkCollectionTable = ({
	remove,
	optionsTypesTitle,
	optionsTypes,
	registerRef,
	fields,
	optionChecked,
	onOptionChange,
	name,
}: Props) => {
	const { t } = useTranslation();

	const columns = [];

	if (optionsTypesTitle) {
		columns.push({
			Header: optionsTypesTitle,
			accessor: "isSelected",
		});
	}

	columns.push(
		{
			Header: t("COMMON.NAME"),
			accessor: "type",
		},
		{
			Header: t("COMMON.LINK"),
			accessor: "link",
		},
		{
			Header: " ",
		},
	);

	return (
		<div data-testid="LinkCollectionTable">
			<Table columns={columns} data={fields}>
				{(rowData: EntityLink, rowIndex: any) => (
					<tr
						data-testid="LinkCollectionTable__row"
						key={rowData.value}
						className="font-semibold border-b border-theme-neutral-200"
					>
						{optionsTypesTitle && (
							<td className="w-16 text-center">
								{optionsTypes?.includes(rowData.type) && (
									<RadioButton
										data-testid="LinkCollectionTable__row__option"
										checked={optionChecked === rowIndex}
										onChange={() => onOptionChange?.(rowData)}
									/>
								)}
							</td>
						)}

						<td
							data-testid="LinkCollectionTable__row__type"
							className={`w-40 ${rowIndex > 0 ? "py-6" : "pb-6 pt-2"}`}
						>
							<input
								className="hidden"
								name={`${name}[${rowIndex}].type`}
								ref={registerRef()}
								defaultValue={rowData.type}
								readOnly
							/>
							<span>{t(`TRANSACTION.LINK_TYPES.${rowData.type.toUpperCase()}`)}</span>
						</td>

						<td
							data-testid="LinkCollectionTable__row__value"
							className={rowIndex > 0 ? "py-6" : "pb-6 pt-2"}
						>
							<input
								className="focus:outline-none"
								name={`${name}[${rowIndex}].value`}
								ref={registerRef()}
								defaultValue={rowData.value}
								readOnly
							/>
						</td>

						<td className={`w-16 text-right ${rowIndex === 0 && "pb-4"}`}>
							<Button
								data-testid="LinkCollectionTable__remove-link"
								size="icon"
								variant="plain"
								onClick={() => remove(rowIndex)}
							>
								<Icon name="Trash" />
							</Button>
						</td>
					</tr>
				)}
			</Table>
		</div>
	);
};
