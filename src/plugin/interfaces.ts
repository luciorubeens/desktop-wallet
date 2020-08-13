enum ColorMode {
	Light = 1,
	Dark = 2,
}

export interface ThemeConfig {
	name: string;
	colors: Record<string, string>;
	colorMode: ColorMode;
}

export interface ProfilePluginAPI {
	onDidProfileChange: (cb: (profile: object) => void) => void;
}

export interface HTTPPluginAPI {
	get: (url: string) => any;
}

export interface PluginAPI {
	profile: () => ProfilePluginAPI;
	http: () => HTTPPluginAPI;
}

export interface Plugin {
	activate: () => void;
	deactivate?: () => void;
}

export interface PluginManifest {
	name: string;
	description: string;
	permissions: string[];
	config: Record<string, string>;
}

export enum PluginPermission {
	Http = "HTTP",
}

export enum PluginSetting {
	URLs = "urls",
}

export interface PluginData {
	hasPermission: (permission: PluginPermission) => boolean;
	isAuthorized: () => boolean;
	config: (key: PluginSetting) => any;
	manifest(): PluginManifest;
}
