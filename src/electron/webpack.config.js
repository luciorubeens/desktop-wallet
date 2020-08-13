const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	target: "electron-main",
	mode: "development",
	entry: path.resolve(__dirname, "./index"),
	output: {
		path: path.resolve("dist", "target"),
		filename: "index.js",
	},
	externals: [nodeExternals({})],
	resolve: {
		extensions: [".js", ".ts"],
	},
	module: {
		rules: [
			{
				test: /\.(js|ts)$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							babelrc: false,
							presets: [
								["@babel/preset-env", { targets: { node: "current" } }],
								"@babel/preset-typescript",
							],
						},
					},
				],
			},
		],
	},
	node: {
		__dirname: false,
		__filename: false,
	},
};
