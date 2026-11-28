export type Theme = 'system' | 'light' | 'dark';
const KEY = 'mn-theme';
export const prefs = $state<{ theme: Theme }>({ theme: 'system' });
let started = false;

function apply() {
	const dark =
		prefs.theme === 'dark' ||
		(prefs.theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
	document.documentElement.dataset.theme = dark ? 'dark' : 'light';
}

export function startPrefs() {
	if (started) return;
	started = true;
	const saved = localStorage.getItem(KEY);
	if (saved === 'light' || saved === 'dark') prefs.theme = saved;
	matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		if (prefs.theme === 'system') apply();
	});
	apply();
}

export function setTheme(theme: Theme) {
	prefs.theme = theme;
	localStorage.setItem(KEY, theme);
	apply();
}
