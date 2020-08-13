const path = require("path");

module.exports = function loader(source) {
	console.log(source);
	const callback = this.async();
	const context = this._module.issuer.context;
	const manifest = path.join(context, "manifest.json");

	this.addDependency(manifest);
	this.cacheable(false);

	this.loadModule(manifest, (error, manifestSource) => {
		callback(
			null,
			`
			${source}
			const { Plugin } = require("./plugin");
			const pluginData = Plugin.fromManifest(${manifestSource});
			export default new API(pluginData);
		`,
		);
	});
};
