interface PluginData {
	enabled: boolean;
	path: string;
}

type PluginsCollection = {
	[pluginName: string]: PluginData;
};

export interface Config {
	themes: string[];
	plugins: PluginsCollection;
}
