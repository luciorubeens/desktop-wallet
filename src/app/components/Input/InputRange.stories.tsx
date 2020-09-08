import React, { useState } from "react";

import { InputRange } from "./InputRange";

export default { title: "App / Components / InputRange" };

export const Default = () => {
	const [value, setValue] = useState((25 * 1e8).toFixed(0));
	const fees = {
		min: 0,
		max: 100,
	};

	return (
		<div className="max-w-lg">
			<InputRange {...fees} value={value} step={0.01} onChange={(output) => setValue(output.display)} />

			{value}
		</div>
	);
};
