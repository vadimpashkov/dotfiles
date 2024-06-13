import inquirer from 'inquirer';
import fs from 'fs';

import { ensureConfigDirExists } from '@utils';

import { getPathToConfig } from '../utils';

export async function createConfig() {
	const configFilePath = getPathToConfig();

	const answers = await inquirer.prompt([
		{
			type: 'checkbox',
			name: 'plugins',
			message: 'Which plugins would you like to enable?',
			choices: ['wallpapers', 'waybar'],
		},
	]);

	const config = {
		themes: ['Default'],
		plugins: {
			wallpapers: {
				enabled: answers.plugins.includes('wallpapers'),
				path: '.local/share/Wallpapers',
			},
			waybar: {
				enabled: answers.plugins.includes('waybar'),
				path: '.config/waybar',
			},
		},
	};

	ensureConfigDirExists();
	fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
	console.log('Config created successfully!');
}
