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

	chooseTypes?: string[];
	chooseTypesTitle?: string;
	onChoose?: (link: EntityLink) => void;
	activeChoose?: EntityLink;
};

export const LinkCollectionTable = ({
	remove,
	chooseTypesTitle,
	chooseTypes,
	registerRef,
	fields,
	activeChoose,
	onChoose,
	name,
}: Props) => {
	const { t } = useTranslation();

	const columns = [];

	if (chooseTypesTitle) {
		columns.push({
			Header: chooseTypesTitle,
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
						{chooseTypesTitle && (
							<td className="w-16 text-center">
								{chooseTypes && chooseTypes.includes(rowData.type) && (
									<RadioButton
										data-testid="LinkCollection__selected"
										checked={
											activeChoose?.type === rowData.type && activeChoose?.value === rowData.value
										}
										onChange={() => onChoose?.(rowData)}
									/>
								)}
							</td>
						)}

						<td className={`w-40 ${rowIndex > 0 ? "py-6" : "pb-6 pt-2"}`}>
							<input
								className="hidden"
								name={`${name}[${rowIndex}].type`}
								ref={registerRef()}
								defaultValue={rowData.type}
								readOnly
							/>
							<span>{t(`TRANSACTION.LINK_TYPES.${rowData.type.toUpperCase()}`)}</span>
						</td>

						<td className={rowIndex > 0 ? "py-6" : "pb-6 pt-2"}>
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
