type Join<K, P> = K extends string | number ? (P extends string | number ? `${K}.${P}` : never) : never;
type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...0[]];
type Paths<T, D extends number = 10> = [D] extends [never]
	? never
	: T extends object
		? {
				[K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never;
			}[keyof T]
		: never;

// Интерфейс сгенерирован с помощью generateLocalizationsTypes.js
export interface LocalizationValues {
	changeTheme: {
		name: string;
		description: string;
	};
	changeColorScheme: {
		name: string;
		description: string;
	};
	configFileAlready: string;
	notConfigFile: string;
	themeName: string;
	createConfigCommand: {
		description: string;
	};
	addThemeCommand: {
		description: string;
	};
	setThemeCommand: {
		successfulSetOfTheme: string;
		description: string;
	};
}

// Интерфейс сгенерирован с помощью generateLocalizationsTypes.js
export interface LocalizationKeys {
	en: LocalizationValues;
	ru: LocalizationValues;
}

export type LocalizationKeyPath = Paths<LocalizationValues>;
