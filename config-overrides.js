const {
	override,
	addPostcssPlugins,
	addWebpackAlias,
	addWebpackExternals,
	addWebpackPlugin,
	setWebpackTarget,
	addWebpackModuleRule,
} = require("customize-cra");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const addNodeExternals = () =>
	addWebpackExternals([
		nodeExternals({
			allowlist: [/tippy/, /swiper/, "isomorphic-fetch"],
		}),
	]);

const injectTailwindCSS = () =>
	addPostcssPlugins([
		require("postcss-import"),
		require("tailwindcss")("./src/tailwind.config.js"),
		require("autoprefixer"),
	]);

const copyFiles = () =>
	addWebpackPlugin(
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.join(__dirname, "dist/main/main.js"),
					to: path.join(__dirname, "build/electron/index.js"),
				},
			],
		}),
	);

module.exports = override(
	setWebpackTarget("electron-renderer"),
	injectTailwindCSS(),
	addNodeExternals(),
	copyFiles(),
	addWebpackAlias({
		"@arkecosystem/crypto": "@arkecosystem/crypto/dist/index.esm.js",
	}),
);

module.exports.injectTailwindCSS = injectTailwindCSS;
