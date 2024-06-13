import { LocalizationKeyPath, LocalizationKeys, LocalizationValues } from './types';
import combinedData from './combined.json';

export enum LOCALIZATION_LANGUAGE {
	RU = 'ru',
	EN = 'en',
}

const interpolate = (str: string, values: Record<string, any>): string => {
	return str.replace(/\{\{(.*?)\}\}/g, (_, key) => values[key.trim()]);
};

const generateMissingLocalizationError = (base: LocalizationValues, locale: LocalizationValues) => {
	const missingKeys = Object.keys(base).filter((key) => !(key in locale));
	if (missingKeys.length > 0) {
		throw new Error(`Не найдены ключи: ${missingKeys.join(', ')}.`);
	}
};

export const getLocalization = (language?: LOCALIZATION_LANGUAGE): LocalizationValues => {
	const currentLanguage = language ?? getCurrentLanguage();
	const locales = combinedData as LocalizationKeys;
	// ru.json используется в качестве "эталона" (т.е. как основной для проверок "потеряшек")
	const defaultLocale = locales[LOCALIZATION_LANGUAGE.RU];
	const locale = locales[currentLanguage] as LocalizationValues;

	if (!locale) {
		throw new Error(`Не найдена локализация для языка "${currentLanguage}".`);
	}

	generateMissingLocalizationError(defaultLocale, locale);

	return locale;
};

export const getLocalizedString = (
	key: LocalizationKeyPath,
	values: Record<string, any>,
	language?: LOCALIZATION_LANGUAGE,
): string => {
	const localization = language ? getLocalization(language) : getLocalization();
	const keys = key.split('.');
	let result = localization;

	while (keys.length > 0) {
		result = result[keys.shift()!];

		if (result === undefined) {
			throw new Error(`Не найден ключ локализации "${key}".`);
		}
	}

	if (typeof result !== 'string') {
		throw new Error(`Передали НЕ строку для инерполяции, для ключа "${key}".`);
	}

	return interpolate(result, values);
};

export const getCurrentLanguage = (): LOCALIZATION_LANGUAGE => {
	// TODO: Нужно сделать, чтобы с конфига тянул
	return LOCALIZATION_LANGUAGE.RU;
};
