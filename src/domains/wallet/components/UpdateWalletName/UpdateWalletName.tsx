import { images } from "app/assets/images";
import { Button } from "app/components/Button";
import { Form, FormField, FormHelperText, FormLabel } from "app/components/Form";
import { Input } from "app/components/Input";
import { Modal } from "app/components/Modal";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type UpdateWalletNameProps = {
	name?: string;
	isOpen: boolean;
	onClose?: any;
	onCancel?: any;
	onSave: any;
};

const { NameWalletBanner } = images.wallet.components.updateWalletName;

export const UpdateWalletName = ({ isOpen, onClose, onCancel, onSave, name }: UpdateWalletNameProps) => {
	const methods = useForm({ mode: "onChange", defaultValues: { name } });
	const { setValue, register, errors, watch } = methods;
	const formValues = watch();

	const { t } = useTranslation();
	const nameMaxLength = 42;

	useEffect(() => {
		if (isOpen) setValue("name", name as string);
	}, [name, isOpen, setValue]);

	const isNameValid = useMemo(() => !!formValues.name?.trim() && !errors?.name, [formValues, errors]);

	const handleSubmit = ({ name }: any) => {
		const formattedName = name.substring(0, nameMaxLength);
		onSave?.({ name: formattedName });
	};

	return (
		<Modal
			title={t("WALLETS.MODAL_NAME_WALLET.TITLE")}
			description={t("WALLETS.MODAL_NAME_WALLET.DESCRIPTION")}
			image={<NameWalletBanner className="my-8" />}
			isOpen={isOpen}
			onClose={onClose}
		>
			<Form context={methods} onSubmit={handleSubmit} className="mt-8">
				<FormField name="name">
					<FormLabel>{t("WALLETS.MODAL_NAME_WALLET.FIELD_NAME")}</FormLabel>
					<Input
						data-testid="UpdateWalletName__input"
						ref={register({
							required: t("COMMON.VALIDATION.FIELD_REQUIRED", {
								field: t("COMMON.NAME"),
							}).toString(),
							maxLength: {
								value: nameMaxLength,
								message: t("COMMON.VALIDATION.MAX_LENGTH", {
									field: t("WALLETS.MODAL_NAME_WALLET.FIELD_NAME"),
									maxLength: nameMaxLength,
								}),
							},
						})}
					/>
					<FormHelperText />
				</FormField>

				<div className="flex justify-end mt-8 space-x-3">
					<Button variant="plain" onClick={onCancel}>
						{t("COMMON.CANCEL")}
					</Button>

					<Button type="submit" data-testid="UpdateWalletName__submit" disabled={!isNameValid}>
						{t("COMMON.SAVE")}
					</Button>
				</div>
			</Form>
		</Modal>
	);
};

UpdateWalletName.defaultProps = {
	isOpen: false,
};

UpdateWalletName.displayName = "UpdateWalletName";
