import webpack from "webpack";

import config from "./webpack/config";

webpack(
	{
		...config,
		mode: "development",
	},
	(err, stats) => {
		if (err || stats.hasErrors()) {
			console.error(stats.compilation.errors);
		} else {
			console.log(stats);
		}
	},
);
