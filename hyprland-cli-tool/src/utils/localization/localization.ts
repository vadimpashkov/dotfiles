import fs from "fs";
import path from "path";

import { Locale, SupportedLanguages } from "./types";
import { LOCALE_LANGUAGE } from "./define";

export const locales: Locale = {
  [LOCALE_LANGUAGE.RU]: {},
};

export const loadLocales = (modules: string[], lang: SupportedLanguages) => {
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

export const getLocaleString = (
  key: string,
  lang: SupportedLanguages = LOCALE_LANGUAGE.RU,
): string => {
  if (!locales[lang][key]) {
    throw new Error(
      `Localization key "${key}" not found for language "${lang}"`,
    );
  }
  return locales[lang][key];
};

export function getCurrentLocale() {
  // TODO: Нужно потом сделать, чтобы это из конфига получалось
  return LOCALE_LANGUAGE.RU;
}
