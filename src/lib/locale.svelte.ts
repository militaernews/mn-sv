import { getLocale, isLocale, setLocale as setParaglideLocale } from './paraglide/runtime.js';

/** Reactive mirror of Paraglide's locale, so components follow the language setting. */
export const localeState = $state({ value: getLocale() });

export function changeLocale(locale: string) {
	if (!isLocale(locale)) return;
	setParaglideLocale(locale);
	localeState.value = getLocale();
}
