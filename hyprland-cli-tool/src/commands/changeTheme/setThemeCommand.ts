import { Command } from 'commander';

import { getLocalization } from '@localization';

import { setTheme } from './actions';
import { checkConfigExists } from './utils';

export function setThemeCommand() {
	const command = new Command('set');
	const localization = getLocalization();

	command
		.description(localization.setThemeCommand.description)
		.argument('[theme-name]', localization.themeName, 'Default')
		.action(async (themeName) => {
			if (!checkConfigExists()) {
				return;
			}

			await setTheme(themeName);
		});

	return command;
}
