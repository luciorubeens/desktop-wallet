import { NetworkData, Profile, ReadWriteWallet } from "@arkecosystem/platform-sdk-profiles";
import { FormField, FormLabel } from "app/components/Form";
import { SelectNetwork } from "domains/network/components/SelectNetwork";
import { SelectAddress } from "domains/profile/components/SelectAddress";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { TransactionInputFee } from "../InputFee/TransactionInputFee";

type SendTransactionFormProps = {
	networks: NetworkData[];
	profile: Profile;
	children?: React.ReactNode;
};

export const SendTransactionForm = ({ children, networks, profile }: SendTransactionFormProps) => {
	const history = useHistory();
	const { t } = useTranslation();
	const [wallets, setWallets] = useState<ReadWriteWallet[]>([]);

	const form = useFormContext();
	const { setValue } = form;
	const { network, senderAddress } = form.watch();

	useEffect(() => {
		if (network) {
			return setWallets(profile.wallets().findByCoinWithNetwork(network.coin(), network.id()));
		}
		setWallets(profile.wallets().values());
	}, [network, profile]);

	const onSelectSender = (address: any) => {
		setValue("senderAddress", address, true);

		const wallet = wallets.find((wallet) => wallet.address() === address);
		history.push(`/profiles/${profile.id()}/wallets/${wallet!.id()}/send-transfer`);
	};

	return (
		<div className="space-y-8 SendTransactionForm">
			<FormField name="network" className="relative">
				<div className="mb-2">
					<FormLabel label="Network" />
				</div>
				<SelectNetwork
					id="SendTransactionForm__network"
					networks={networks}
					selected={network}
					disabled={!!senderAddress}
					onSelect={(selectedNetwork: NetworkData | null | undefined) => setValue("network", selectedNetwork)}
				/>
			</FormField>

			<FormField name="senderAddress" className="relative">
				<div className="mb-2">
					<FormLabel label="Sender" />
				</div>

				<div data-testid="sender-address">
					<SelectAddress
						address={senderAddress}
						wallets={wallets}
						disabled={wallets.length === 0}
						onChange={onSelectSender}
					/>
				</div>
			</FormField>

			{children}

			{network && (
				<FormField name="fee">
					<FormLabel label={t("TRANSACTION.TRANSACTION_FEE")} />
					<TransactionInputFee
						coin={network.coin()}
						network={network.id()}
						type={"transfer"}
						onChange={(value) => setValue("fee", value, true)}
					/>
				</FormField>
			)}
		</div>
	);
};
