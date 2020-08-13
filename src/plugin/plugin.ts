import { PluginData, PluginManifest } from "./interfaces";

export class Plugin implements PluginData {
	_manifest: PluginManifest;

	constructor(manifest: PluginManifest) {
		this._manifest = manifest;
	}

	static fromObject(manifest: PluginManifest) {
		// TODO: Sanitize
		return new Plugin(manifest);
	}

	isAuthorized() {
		return true;
	}

	hasPermission() {
		return true;
	}

	config() {
		return null;
	}

	manifest() {
		return this._manifest;
	}
}
