const path = require("path");
const nodeExternals = require("webpack-node-externals");
console.log(path.resolve(__dirname, "../api"));
const config = {
	entry: {
		example: path.resolve(".plugins/example/plugin.ts"),
		vendors: [path.resolve(__dirname, "../api.ts")],
	},
	output: {
		path: path.resolve("dist", "tmp", "plugins"),
		filename: "[name].plugin.js",
	},
	// externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: path.resolve(__dirname, "../api.ts"),
				loader: path.resolve(__dirname, "api-loader.js"),
			},
			{
				test: /plugin\.(js|ts)$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							babelrc: false,
							presets: [
								[
									"@babel/preset-env",
									{
										targets: {
											node: "current",
										},
									},
								],
								"@babel/preset-typescript",
							],
							plugins: ["@babel/plugin-proposal-class-properties"],
						},
					},
				],
				resolve: {
					extensions: [".js", ".ts", ".json"],
					// modules: [],
					alias: {
						"@arkecosystem/wallet-plugin": path.resolve(__dirname, "../api.ts"),
					},
				},
			},
			{
				test: /(js|ts)$/,
				exclude: /\.plugins/,
				use: [
					{
						loader: "babel-loader",
						options: {
							babelrc: false,
							presets: [
								[
									"@babel/preset-env",
									{
										targets: {
											node: "current",
										},
									},
								],
								"@babel/preset-typescript",
							],
							plugins: ["@babel/plugin-proposal-class-properties"],
						},
					},
				],
				resolve: {
					extensions: [".js", ".ts", ".json"],
				},
			},
		],
	},
	node: {
		__filename: true,
		__dirname: true,
	},
};

module.exports = config;
