import pluginAPI from "@arkecosystem/wallet-plugin";

class XPlugin {
	activate() {
		pluginAPI.profile().onDidProfileChange((profile) => {
			console.log(profile.name, "4");
		});
	}
}

export default XPlugin;
