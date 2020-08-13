import { httpClient } from "../app/services";
import { HttpClient } from "../app/services/HttpClient";
import { HTTPPluginAPI, PluginAPI, PluginData, ProfilePluginAPI } from "./interfaces";
import { ProfileService, profileService } from "./services/profile.service";

class ProfileAPI implements ProfilePluginAPI {
	service: ProfileService;
	plugin: PluginData;

	constructor(plugin: PluginData) {
		this.service = profileService;
		this.plugin = plugin;
	}

	onDidProfileChange(callback: (profile: any) => void) {
		profileService.onDidProfileChange(callback);
	}
}

class HttpAPI implements HTTPPluginAPI {
	service: HttpClient;
	plugin: PluginData;

	constructor(plugin: PluginData) {
		this.service = httpClient;
		this.plugin = plugin;
	}

	get(url: string) {
		return this.service.get(url);
	}
}

export class API implements PluginAPI {
	plugin: PluginData;

	constructor(plugin: PluginData) {
		this.plugin = plugin;
	}

	profile() {
		return new ProfileAPI(this.plugin);
	}

	http() {
		return new HttpAPI(this.plugin);
	}
}
