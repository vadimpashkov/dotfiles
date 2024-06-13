import { LOCALE_LANGUAGE } from "./define";

export interface LocalizationStrings {
  [key: string]: string;
}

export interface Locale {
  [LOCALE_LANGUAGE.RU]: LocalizationStrings;
}

export type SupportedLanguages = keyof Locale;
