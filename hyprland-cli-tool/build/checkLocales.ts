import fs from "fs";
import path from "path";

import { locales, loadLocales, LOCALE_LANGUAGE } from "../src/utils";

const modulesDir = path.resolve(__dirname, "../src");

const getDirectories = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const modules = getDirectories(modulesDir);
const languages: (keyof typeof locales)[] = Object.keys(
  locales,
) as LOCALE_LANGUAGE[];

languages.forEach((lang) => loadLocales(modules, lang));

const referenceLang = languages[0];
const referenceKeys = Object.keys(locales[referenceLang]);

for (const lang of languages) {
  if (lang === referenceLang) continue;

  for (const key of referenceKeys) {
    if (!(key in locales[lang])) {
      console.error(`Missing key "${key}" in language "${lang}"`);
      process.exit(1);
    }
  }
}

console.log("Localization check passed.");
