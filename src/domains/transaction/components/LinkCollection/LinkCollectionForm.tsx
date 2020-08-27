import { Button } from "app/components/Button";
import { Form, FormField, FormLabel } from "app/components/Form";
import { Input } from "app/components/Input";
import { Select } from "app/components/SelectDropdown";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { EntityLink } from "./LinkCollection.models";

type Props = {
	selectOptions: { label: string; value: string }[];
	append: (link: EntityLink) => void;
	itemLabel: string;
};

export const LinkCollectionForm = ({ selectOptions, append, itemLabel }: Props) => {
	const { t } = useTranslation();

	// TODO: Validate URL
	const form = useForm();
	const { register, reset } = form;

	const handleSubmit = (link: EntityLink) => {
		reset();
		append(link);
	};

	return (
		<Form
			data-testid="LinkCollectionForm"
			context={form}
			onSubmit={(data: any) => handleSubmit(data as EntityLink)}
			className="grid col-gap-2 row-gap-4"
			style={{
				gridTemplateColumns: "40% 60%",
			}}
		>
			<FormField name="type">
				<FormLabel label={`Add ${itemLabel}`} />
				<Select options={selectOptions} ref={register({ required: true })} />
			</FormField>

			<FormField name="value">
				<FormLabel label={t("COMMON.LINK")} />
				<Input data-testid="LinkCollectionForm__value" ref={register({ required: true })} />
			</FormField>

			<Button data-testid="LinkCollectionForm__submit" className="col-span-2" variant="plain" type="submit">
				{t("TRANSACTION.ADD_LINK")}
			</Button>
		</Form>
	);
};
