import fs from "fs";
import path from "path";
import { Locale, SupportedLanguages } from "../../types/locale";

const locales: Locale = {
  en: {},
  ru: {},
};

const loadLocales = (modules: string[], lang: SupportedLanguages) => {
  modules.forEach((module) => {
    const localePath = path.resolve(
      __dirname,
      `../modules/${module}/locale/${lang}.json`,
    );
    if (fs.existsSync(localePath)) {
      Object.assign(locales[lang], require(localePath));
    } else {
      console.warn(`Locale file not found: ${localePath}`);
    }
  });
};

const getLocaleString = (
  key: string,
  lang: SupportedLanguages = "en",
): string => {
  if (!locales[lang][key]) {
    throw new Error(
      `Localization key "${key}" not found for language "${lang}"`,
    );
  }
  return locales[lang][key];
};

export { loadLocales, getLocaleString, locales };

export function getCurrentLocale() {
  // TODO: Нужно потом сделать, чтобы это из конфига получалось
  return "ru-RU";
}
