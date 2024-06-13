import fs from 'fs';
import path from 'path';

import { configDir } from '@utils';
import { getLocalization } from '@localization';

import { Config } from './types';
import { CONFIG_FILE_NAME } from './define';

export function getPathToConfig() {
	return path.join(configDir, CONFIG_FILE_NAME);
}

export function getConfig(): Config {
	return JSON.parse(fs.readFileSync(getPathToConfig(), 'utf-8'));
}

export function checkConfigExists(): boolean {
	const configFilePath = getPathToConfig();
	const localization = getLocalization();

	if (!fs.existsSync(configFilePath)) {
		console.error(localization.error.notConfigFile);
		return false;
	}

	return true;
}
