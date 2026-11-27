export type Theme = 'system' | 'light' | 'dark';
export const THEMES: Theme[] = ['system', 'light', 'dark'];

const THEME_KEY = 'mn-sv:theme';

/** Colour scheme is remembered; the language comes from the URL. Pages are prerendered in both. */
export const prefs = $state({ theme: 'system' as Theme, systemDark: false });

let started = false;

function read(key: string): string | null {
	try {
		return localStorage.getItem(key);
	} catch {
		return null; // storage blocked
	}
}

function write(key: string, value: string) {
	try {
		localStorage.setItem(key, value);
	} catch {
		// not remembered, still applied
	}
}

/** Reads the remembered scheme once in the browser; app.html already applied it before paint */
export function startPrefs() {
	if (started) return;
	started = true;
	const theme = read(THEME_KEY);
	prefs.theme = theme === 'light' || theme === 'dark' ? theme : 'system';
	const media = matchMedia('(prefers-color-scheme: dark)');
	prefs.systemDark = media.matches;
	media.addEventListener('change', (event) => (prefs.systemDark = event.matches));
}

export function setTheme(theme: Theme) {
	prefs.theme = theme;
	if (theme === 'system') delete document.documentElement.dataset.theme;
	else document.documentElement.dataset.theme = theme;
	write(THEME_KEY, theme);
}

export function isDark() {
	return prefs.theme === 'dark' || (prefs.theme === 'system' && prefs.systemDark);
}
