import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesRootDir = path.join(__dirname, '..', 'src', 'localization', 'locales');
const commandsDir = path.join(__dirname, '..', 'src', 'commands');
const outputFile = path.join(localesRootDir, '..', 'combined.json');

const getJsonFiles = (dir) => {
	const files = fs.readdirSync(dir);
	let jsonFiles = [];

	files.forEach((file) => {
		const filePath = path.join(dir, file);
		if (fs.lstatSync(filePath).isDirectory()) {
			jsonFiles = jsonFiles.concat(getJsonFiles(filePath));
		} else if (file.endsWith('.json')) {
			jsonFiles.push(filePath);
		}
	});

	return jsonFiles;
};

const deepMerge = (target, source) => {
	for (const key of Object.keys(source)) {
		if (source[key] instanceof Object && key in target) {
			Object.assign(source[key], deepMerge(target[key], source[key]));
		}
	}
	return Object.assign(target || {}, source);
};

const combineLocalizations = () => {
	const locales = ['en', 'ru'];
	const combinedData = {};

	locales.forEach((locale) => {
		combinedData[locale] = {};

		const localeFiles = getJsonFiles(localesRootDir)
			.filter((file) => file.endsWith(`${locale}.json`))
			.concat(getJsonFiles(commandsDir).filter((file) => file.endsWith(`${locale}.json`)));

		localeFiles.forEach((filePath) => {
			const jsonFile = fs.readFileSync(filePath, 'utf8') || '{}';
			const data = JSON.parse(jsonFile);
			deepMerge(combinedData[locale], data);
		});
	});

	fs.writeFileSync(outputFile, JSON.stringify(combinedData, null, 2));
};

combineLocalizations();
console.log('Localization files combined successfully.');
