import * as yup from "yup";

export const schema = yup.object().shape({
	author: yup.lazy((value) =>
		typeof value === "string" ? yup.string() : yup.array().of(yup.object({ name: yup.string() })),
	),
	keywords: yup.array().of(yup.string()),
	contributors: yup.lazy((value) =>
		typeof value === "string" ? yup.string() : yup.array().of(yup.object({ name: yup.string() })),
	),
	name: yup.string().required(),
	version: yup.string(),

	"desktop-wallet": yup.object().shape({
		categories: yup.array().of(yup.string()),
		logo: yup.string(),
		permissions: yup.array().of(yup.string()),
		title: yup.string(),
		urls: yup.array().of(yup.string()),
	}),
});
