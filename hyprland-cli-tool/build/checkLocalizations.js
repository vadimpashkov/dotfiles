import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const localesPath = join(__dirname, '..', 'src', 'localization', 'locales');
const combinedFile = join(localesPath, '..', 'combined.json');
const locales = ['en', 'ru']; // Добавьте другие языки в этот массив, если они есть

const checkLocalizationConsistency = () => {
	const jsonFile = readFileSync(combinedFile, 'utf8') || '{}';
	const combinedData = JSON.parse(jsonFile);
	const baseLocale = combinedData['ru']; // Здесь ru является эталонным языком

	locales.forEach((locale) => {
		if (locale === 'ru') return; // Пропускаем проверку для эталонного языка
		const localeData = combinedData[locale];

		const compareObjects = (baseObj, localeObj, path = '') => {
			Object.keys(baseObj).forEach((key) => {
				if (!(key in localeObj)) {
					throw new Error(`Missing localization key "${path + key}" in "${locale}" locale.`);
				}
				if (baseObj[key] instanceof Object) {
					compareObjects(baseObj[key], localeObj[key], `${path}${key}.`);
				}
			});
		};

		compareObjects(baseLocale, localeData);
	});

	console.log('Localization keys are consistent.');
};

checkLocalizationConsistency();
