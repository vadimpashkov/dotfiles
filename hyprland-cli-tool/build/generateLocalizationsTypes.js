import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localizationPath = path.join(__dirname, '..', 'src', 'localization');
const inputFilePath = path.join(localizationPath, 'combined.json');
const outputFilePath = path.join(localizationPath, 'types.ts');

const generateType = (obj, depth = 0) => {
	const indentation = '	'.repeat(depth);
	let typeStr = '{\n';

	for (const key in obj) {
		if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
			typeStr += `${indentation}	${key}: ${generateType(obj[key], depth + 1)};\n`;
		} else {
			typeStr += `${indentation}	${key}: ${typeof obj[key]};\n`;
		}
	}

	typeStr += `${indentation}}`;
	return typeStr;
};

const combinedData = JSON.parse(fs.readFileSync(inputFilePath, 'utf8'));
const localizationValuesInterface = `export interface LocalizationValues ${generateType(combinedData['ru'])};`;

let localizationKeysInterface = `export interface LocalizationKeys {\n`;
for (const lang in combinedData) {
	localizationKeysInterface += `  ${lang}: LocalizationValues;\n`;
}
localizationKeysInterface += `}`;

const writeOrUpdateTypes = (filePath) => {
	let fileContent = '';
	if (fs.existsSync(filePath)) {
		fileContent = fs.readFileSync(filePath, 'utf8');
	}

	if (fileContent.includes('export interface LocalizationValues')) {
		fileContent = fileContent.replace(
			/export interface LocalizationValues\s{[\w;:\s{}]*}/,
			localizationValuesInterface,
		);
	} else {
		fileContent += `\n// Интерфейс сгенерирован с помощью generateLocalizationsTypes.js\n${localizationValuesInterface}`;
	}

	if (fileContent.includes('export interface LocalizationKeys')) {
		fileContent = fileContent.replace(/export interface LocalizationKeys [\s\S]*?};/, localizationKeysInterface);
	} else {
		fileContent += `\n\n// Интерфейс сгенерирован с помощью generateLocalizationsTypes.js\n${localizationKeysInterface}`;
	}

	fs.writeFileSync(filePath, fileContent);
};

writeOrUpdateTypes(outputFilePath);

console.log('TypeScript types have been updated successfully.');
