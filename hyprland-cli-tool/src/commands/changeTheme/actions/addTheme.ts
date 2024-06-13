import inquirer from 'inquirer';
import fs from 'fs';

import { getConfig } from '../utils';

export async function addTheme(theme: string) {
	const config = getConfig();

	if (!config.themes.includes(theme)) {
		const answer = await inquirer.prompt([
			{
				type: 'confirm',
				name: 'addTheme',
				message: `Theme "${theme}" is not in the config. Would you like to add it?`,
				default: true,
			},
		]);

		if (answer.addTheme) {
			const pluginPaths = await inquirer.prompt([
				{
					type: 'input',
					name: 'wallpapersPath',
					message: 'Enter path for wallpapers plugin:',
					default: config.plugins.wallpapers.path,
				},
				{
					type: 'input',
					name: 'waybarPath',
					message: 'Enter path for waybar plugin:',
					default: config.plugins.waybar.path,
				},
			]);

			config.plugins.wallpapers.path = pluginPaths.wallpapersPath;
			config.plugins.waybar.path = pluginPaths.waybarPath;

			config.themes.push(theme);
			fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
			console.log(`Theme "${theme}" has been added to the config with updated plugin paths.`);
		} else {
			console.log('No changes made to the config.');
		}
	} else {
		console.log(`Theme "${theme}" is already in the config.`);
	}
}
