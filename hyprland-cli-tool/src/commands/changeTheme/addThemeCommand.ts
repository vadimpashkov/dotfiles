import { Command } from 'commander';

import { getLocalization } from '@localization';

import { addTheme } from './actions';
import { checkConfigExists } from './utils';

export function addThemeCommand() {
	const command = new Command('add');
	const localization = getLocalization();

	command
		.description(localization.addThemeCommand.description)
		.argument('<theme-name>', localization.themeName)
		.action(async (themeName) => {
			if (!checkConfigExists()) {
				return;
			}

			await addTheme(themeName);
		});

	return command;
}
