import { promises as fs } from "fs";
import path from "path";
import process from "process";

import { getHomeDir } from "@utils";

import { Config } from "../types";
import { getConfig } from "../utils";
import { THEMES_FOLDER_NAME } from "../define";

async function linkThemeFileToRootDir(
	pathToPlugin: string,
	pathToTheme: string,
) {
	try {
		const themeFiles = await fs.readdir(pathToTheme);

		await Promise.all(
			themeFiles.map(async (file) => {
				const srcPath = path.join(pathToTheme, file);
				const destPath = path.join(pathToPlugin, file);

				try {
					// Попытка удалить существующие символические ссылки или файлы
					await fs.unlink(destPath);
				} catch (error) {
					// Игнорируем ошибки, связанные с отсутствием файла или ссылки
					if (error.code !== "ENOENT") {
						throw error;
					}
				}

				await fs.symlink(srcPath, destPath);
			}),
		);
	} catch (error) {
		console.error("Error creating symbolic links:", error);
		process.exit(1);
	}
}

async function changeThemeToPlugins(
	config: Config,
	homeDir: string,
	themeName: string,
) {
	const plugins = config.plugins;

	for (const [
		pluginName,
		{ enabled: pluginEnabled, path: pluginPath },
	] of Object.entries(plugins)) {
		if (!pluginEnabled) {
			continue;
		}

		const pathToPlugin = path.join(homeDir, pluginPath);
		const pathToTheme = path.join(pathToPlugin, THEMES_FOLDER_NAME, themeName);

		await linkThemeFileToRootDir(pathToPlugin, pathToTheme);
	}
}

function checkThemeNameToConfig(config: Config, themeName: string) {
	if (config.themes.includes(themeName)) {
		return;
	}

	console.error(`Theme "${themeName}" not found in themes list.`);
	process.exit(1);
}

export async function setTheme(themeName: string) {
	const config = getConfig();

	checkThemeNameToConfig(config, themeName);

	await changeThemeToPlugins(config, getHomeDir(), themeName);
}
