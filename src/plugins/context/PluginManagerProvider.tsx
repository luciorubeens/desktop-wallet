import { Request } from "@arkecosystem/platform-sdk-http-node-fetch";
import { Profile } from "@arkecosystem/platform-sdk-profiles";
import { PluginRegistry } from "@arkecosystem/platform-sdk-profiles";
import { toasts } from "app/services";
import { PluginConfigurationData } from "plugins/core/configuration";
import { PluginLoaderFileSystem } from "plugins/loader/fs";
import { PluginService } from "plugins/types";
import React, { useCallback, useMemo, useState } from "react";
import { openExternal } from "utils/electron-utils";

import { PluginController, PluginManager } from "../core";
const PluginManagerContext = React.createContext<any>(undefined);

const useManager = (services: PluginService[], manager: PluginManager) => {
	const [state, setState] = useState<any>({});
	const [pluginRegistry] = useState(() => new PluginRegistry(new Request()));

	const [pluginManager] = useState(() => {
		manager.services().register(services);
		manager.services().boot();
		return manager;
	});

	const loadPlugins = useCallback(async () => {
		try {
			const results = await PluginLoaderFileSystem.ipc().search();
			pluginManager.plugins().fill(results);

			/* istanbul ignore next */
			if (results.length) {
				console.log(
					`Plugins loaded`,
					pluginManager
						.plugins()
						.all()
						.map((item) => item.config().name()),
				);
			}
		} catch (e) {
			/* istanbul ignore next */
			toasts.error(e.message);
		}
	}, [pluginManager]);

	const trigger = useCallback(() => setState((prev: any) => ({ ...prev })), []);

	const reportPlugin = useCallback((plugin: PluginController) => {
		const name = plugin.config().get("name");
		const version = plugin.config().get("version");

		const url = `https://ark.io/contact?subject=desktop_wallet_plugin_report&plugin_id=${name}&plugin_version=${version}`;

		try {
			openExternal(url);
		} catch (e) {
			/* istanbul ignore next */
			toasts.error(e.message);
		}
	}, []);

	const deletePlugin = useCallback(
		async (plugin: PluginController, profile: Profile) => {
			try {
				await PluginLoaderFileSystem.ipc().remove(plugin.dir()!);
				pluginManager.plugins().removeById(plugin.config().id(), profile);
				trigger();

				toasts.success(`The plugin ${plugin.config().title()} was removed successfully.`);
			} catch (e) {
				/* istanbul ignore next */
				toasts.error(e.message);
			}
		},
		[pluginManager, trigger],
	);

	const fetchPluginPackages = useCallback(() => {
		// const result = await pluginRegistry.all();
		// const packages = result.map(item => item.getLatestVersion())
		const packages = require("tests/fixtures/plugins/all-npm-plugins.json");
		const configurations = packages.map((item: any) => PluginConfigurationData.make(item));
		setState((prev: any) => ({ ...prev, packages: configurations }));
	}, []);

	const pluginPackages: PluginConfigurationData[] = useMemo(() => state.packages || [], [state]);

	return {
		pluginRegistry,
		fetchPluginPackages,
		pluginPackages,
		pluginManager,
		loadPlugins,
		trigger,
		state,
		reportPlugin,
		deletePlugin,
	};
};

export const PluginManagerProvider = ({
	children,
	services,
	manager,
}: {
	children: React.ReactNode;
	services: PluginService[];
	manager: PluginManager;
}) => {
	const pluginManager = useManager(services, manager);

	return <PluginManagerContext.Provider value={pluginManager}>{children}</PluginManagerContext.Provider>;
};

export const usePluginManagerContext = (): ReturnType<typeof useManager> => React.useContext(PluginManagerContext);