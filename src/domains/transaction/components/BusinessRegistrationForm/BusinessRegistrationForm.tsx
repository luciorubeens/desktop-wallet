import { ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { Address } from "app/components/Address";
import { Avatar } from "app/components/Avatar";
import { Circle } from "app/components/Circle";
import { FormField, FormLabel } from "app/components/Form";
import { Icon } from "app/components/Icon";
import { Input } from "app/components/Input";
import { Label } from "app/components/Label";
import { Link } from "app/components/Link";
import { TabPanel, Tabs } from "app/components/Tabs";
import { TextArea } from "app/components/TextArea";
import { TransactionDetail } from "app/components/TransactionDetail";
import { EntityMedia, EntitySocialMedia, EntitySourceControl } from "data/aip36";
import { InputFee } from "domains/transaction/components/InputFee";
import { LinkCollection } from "domains/transaction/components/LinkCollection";
import { LinkList } from "domains/transaction/components/LinkList";
import { TotalAmountBox } from "domains/transaction/components/TotalAmountBox";
import {
	RegistrationComponent,
	RegistrationForm,
	RegistrationTransactionDetailsOptions,
} from "domains/transaction/pages/Registration/Registration.models";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SecondStep = ({ feeOptions }: any) => {
	const { t } = useTranslation();
	const { register, control, getValues } = useFormContext();
	const fee = getValues("fee") || null;

	const [checkedAvatarIndex, setCheckedAvatarIndex] = useState<number | undefined>(undefined);

	return (
		<div data-testid="BusinessRegistrationForm__step--second">
			<h1 className="mb-0">{t("TRANSACTION.PAGE_REGISTRATION.SECOND_STEP.TITLE")}</h1>
			<div className="text-theme-neutral-dark">{t("TRANSACTION.PAGE_REGISTRATION.SECOND_STEP.DESCRIPTION")}</div>

			<div>
				<div className="pb-8 mt-8">
					<FormField name="ipfsData.meta.displayName" className="font-normal">
						<FormLabel>{t("TRANSACTION.NAME")}</FormLabel>
						<Input type="text" ref={register} />
					</FormField>

					<FormField name="ipfsData.meta.description" className="mt-8 font-normal">
						<FormLabel>{t("TRANSACTION.DESCRIPTION")}</FormLabel>
						<TextArea ref={register} />
					</FormField>

					<FormField name="ipfsData.meta.website" className="mt-8 font-normal">
						<FormLabel>{t("TRANSACTION.WEBSITE")}</FormLabel>
						<Input type="website" ref={register} />
					</FormField>
				</div>

				<TransactionDetail className="pb-8">
					<LinkCollection
						registerRef={register}
						control={control}
						name="ipfsData.sourceControl"
						title={t("TRANSACTION.REPOSITORIES.TITLE")}
						description={t("TRANSACTION.REPOSITORIES.DESCRIPTION")}
						selectOptions={EntitySourceControl.map((source) => ({
							label: source.name,
							value: source.value,
						}))}
						itemLabel="repository"
					/>
				</TransactionDetail>

				<TransactionDetail className="pb-8">
					<LinkCollection
						registerRef={register}
						control={control}
						name="ipfsData.socialMedia"
						title={t("TRANSACTION.SOCIAL_MEDIA.TITLE")}
						description={t("TRANSACTION.SOCIAL_MEDIA.DESCRIPTION")}
						selectOptions={EntitySocialMedia.map((source) => ({
							label: source.name,
							value: source.value,
						}))}
						itemLabel="media"
					/>
				</TransactionDetail>

				<TransactionDetail className="pb-8">
					<LinkCollection
						registerRef={register}
						control={control}
						name="media"
						title={t("TRANSACTION.PHOTO_VIDEO.TITLE")}
						description={t("TRANSACTION.PHOTO_VIDEO.DESCRIPTION")}
						selectOptions={EntityMedia.map((source) => ({
							label: source.name,
							value: source.value,
						}))}
						itemLabel="files"
						checkOptionsNames={EntityMedia.filter((source) => source.type === "image").map(
							(source) => source.name,
						)}
						checkColumnTitle="Avatar"
						checkedIndex={checkedAvatarIndex}
						onChecked={setCheckedAvatarIndex}
					/>
				</TransactionDetail>

				<TransactionDetail className="pt-6 pb-0">
					<FormField name="fee">
						<FormLabel>{t("TRANSACTION.TRANSACTION_FEE")}</FormLabel>
						<InputFee {...feeOptions} defaultValue={fee || 0} value={fee || 0} step={0.01} ref={register} />
					</FormField>
				</TransactionDetail>
			</div>
		</div>
	);
};

const ThirdStep = ({ wallet }: { wallet: ReadWriteWallet }) => {
	const { t } = useTranslation();
	const { getValues } = useFormContext();
	const { fee, meta, ipfsData } = getValues();

	return (
		<div data-testid="BusinessRegistrationForm__step--third">
			<h1 className="mb-0">{t("TRANSACTION.PAGE_REGISTRATION.THIRD_STEP.TITLE")}</h1>
			<div className="text-theme-neutral-dark">{t("TRANSACTION.PAGE_REGISTRATION.THIRD_STEP.DESCRIPTION")}</div>
			<div className="mt-4">
				<TransactionDetail
					border={false}
					label={t("TRANSACTION.NETWORK")}
					extra={
						<div className="ml-1 text-theme-danger">
							<Circle className="bg-theme-background border-theme-danger-light" size="lg">
								<Icon name="Ark" width={20} height={20} />
							</Circle>
						</div>
					}
				>
					<div className="flex-auto font-semibold truncate text-theme-neutral-800 max-w-24">
						ARK Ecosystem
					</div>
				</TransactionDetail>

				<TransactionDetail
					extra={<Avatar size="lg" address="AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK" />}
					className="pt-4"
				>
					<div className="mb-2 text-sm font-semibold text-theme-neutral">
						<span className="mr-1">{t("TRANSACTION.SENDER")}</span>
						<Label color="warning">
							<span className="text-sm">{t("TRANSACTION.YOUR_ADDRESS")}</span>
						</Label>
					</div>
					<Address address={wallet.address()} walletName={wallet.alias()} />
				</TransactionDetail>

				<TransactionDetail
					label={t("TRANSACTION.TYPE")}
					extra={
						<div>
							<Circle className="border-black bg-theme-background" size="lg">
								<Icon name="Business" width={20} height={20} />
							</Circle>
						</div>
					}
				>
					Business Registration
				</TransactionDetail>

				{ipfsData?.meta?.displayName && (
					<TransactionDetail label={t("TRANSACTION.NAME")}>{meta.displayName}</TransactionDetail>
				)}

				{ipfsData?.meta?.description && (
					<TransactionDetail label={t("TRANSACTION.DESCRIPTION")}>{meta.description}</TransactionDetail>
				)}

				{ipfsData?.meta?.website && (
					<TransactionDetail label={t("TRANSACTION.WEBSITE")}>
						<Link to={meta.website} isExternal />
					</TransactionDetail>
				)}

				{ipfsData?.sourceControl && (
					<TransactionDetail className="mb-2">
						<LinkList
							title="Repository"
							description="Show your projects through the repository"
							links={ipfsData.sourceControl}
						/>
					</TransactionDetail>
				)}

				<div>
					<TotalAmountBox amount={BigNumber.ZERO} fee={BigNumber.make(fee)} />
				</div>
			</div>
		</div>
	);
};

const component = ({ activeTab, wallet, feeOptions }: RegistrationComponent) => (
	<Tabs activeId={activeTab}>
		<TabPanel tabId={2}>
			<SecondStep feeOptions={feeOptions} />
		</TabPanel>
		<TabPanel tabId={3}>
			<ThirdStep wallet={wallet} />
		</TabPanel>
	</Tabs>
);

const transactionDetails = ({ translations }: RegistrationTransactionDetailsOptions) => (
	<>
		<TransactionDetail
			label={translations("TRANSACTION.TRANSACTION_TYPE")}
			extra={
				<Circle className="border-black" size="lg">
					<Icon name="Business" width={20} height={20} />
				</Circle>
			}
		>
			Business Registration
		</TransactionDetail>
		<TransactionDetail label={translations("TRANSACTION.NAME")}>ROBank Eco</TransactionDetail>
		<TransactionDetail label={translations("TRANSACTION.DESCRIPTION")}>Not a trustworthy bank</TransactionDetail>
		<TransactionDetail label={translations("TRANSACTION.WEBSITE")}>
			<a href="http://robank.com" target="_blank" rel="noopener noreferrer" className="link">
				http://robank.com
			</a>
		</TransactionDetail>
	</>
);

component.displayName = "BusinessRegistrationForm";
transactionDetails.displayName = "BusinessRegistrationFormTransactionDetails";

export const BusinessRegistrationForm: RegistrationForm = {
	tabSteps: 2,
	component,
	transactionDetails,
	formFields: ["ipfsData", "fee", "media"],

	// eslint-disable-next-line @typescript-eslint/require-await
	signTransaction: async ({ handleNext, form, setTransaction }) => {
		const { getValues } = form;
		const { ipfsData, fee, media } = getValues();

		handleNext();
	},
};
