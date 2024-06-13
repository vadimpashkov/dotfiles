import { Command } from 'commander';

import { getLocalization } from '@localization';

import { createConfig } from './actions';
import { checkConfigExists } from './utils';

export function createConfigCommand() {
	const command = new Command('create-config');
	const localization = getLocalization();

	command.description(localization.createConfigCommand.description).action(async () => {
		if (!checkConfigExists()) {
			return;
		}

		await createConfig();
	});

	return command;
}
