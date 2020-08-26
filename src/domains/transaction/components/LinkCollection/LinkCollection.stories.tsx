import React from "react";
import { useForm } from "react-hook-form";

import { LinkCollection } from "./LinkCollection";

export default { title: "Domains / Transaction / Components / LinkCollection" };

const types = [
	{
		label: "Facebook",
		value: "facebook",
	},
	{
		label: "Twitter",
		value: "twitter",
	},
	{
		label: "Instagram",
		value: "instagram",
	},
];

export const Default = () => {
	const { control, register } = useForm();

	return (
		<LinkCollection
			control={control}
			registerRef={register}
			selectOptions={types}
			name="socialMedia"
			title="Social Media"
			description="Tell people more about yourself through social media"
			itemLabel="media"
		/>
	);
};
