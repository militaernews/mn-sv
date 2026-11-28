import type { Lang } from './projects.js';

export type Theme = 'system' | 'light' | 'dark';
export const THEMES: Theme[] = ['system', 'light', 'dark'];

const LANG_KEY = 'mn-sv:lang';
const THEME_KEY = 'mn-sv:theme';

/** Only the WebApp fields the theme needs; the real SDK has many more. */
interface TelegramThemeApp {
	colorScheme?: string;
	themeParams?: Record<string, string>;
	onEvent?: (event: string, handler: () => void) => void;
	offEvent?: (event: string, handler: () => void) => void;
	setHeaderColor?: (color: string) => void;
	setBackgroundColor?: (color: string) => void;
}

export const prefs = $state({
	lang: 'de' as Lang,
	theme: 'system' as Theme,
	/** Darkness of the current "system" source: Telegram when open there, otherwise the browser. */
	systemDark: false,
	telegram: false
});

let started = false;
let media: MediaQueryList | undefined;
let tg: TelegramThemeApp | undefined;

function telegramApp(): TelegramThemeApp | undefined {
	if (typeof window === 'undefined') return undefined;
	return (window as unknown as { Telegram?: { WebApp?: TelegramThemeApp } }).Telegram?.WebApp;
}

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

/** The same properties app.html sets before paint, kept in sync when the scheme changes. */
function applyTelegramColors(dark: boolean) {
	const root = document.documentElement;
	const params = tg?.themeParams ?? {};
	const set = (name: string, value: string | undefined, fallback: string) =>
		root.style.setProperty(name, value || fallback);
	set('--bg', params.bg_color, dark ? '#06142a' : '#eef5fb');
	set('--bg-2', params.secondary_bg_color, dark ? '#0a1f3d' : '#dfeaf5');
	set('--card', params.section_bg_color || params.secondary_bg_color, dark ? '#0d2648' : '#ffffff');
	set('--ink', params.text_color, dark ? '#e6f6ff' : '#0b1d33');
	set('--muted', params.hint_color, dark ? '#9fb6c9' : '#4a5d73');
	set(
		'--line',
		params.section_separator_color || params.separator_color,
		dark ? '#1c3a63' : '#c9d9ea'
	);
	set('--accent', params.button_color, dark ? '#2ec5ff' : '#0a7fbf');
	set('--accent-ink', params.button_text_color, dark ? '#04152b' : '#ffffff');
	set('--strong', params.header_text_color || params.text_color, dark ? '#9be7ff' : '#0c3a6b');
	root.style.setProperty('--ring', 'color-mix(in srgb, var(--accent) 18%, transparent)');
	root.style.setProperty('--accent-soft', 'color-mix(in srgb, var(--accent) 12%, transparent)');
	root.style.setProperty('--bg-glass', 'color-mix(in srgb, var(--bg) 85%, transparent)');
	root.style.setProperty('--code', 'color-mix(in srgb, var(--bg-2) 90%, var(--ink))');
}

const INLINE_PROPS = [
	'--bg',
	'--bg-2',
	'--card',
	'--ink',
	'--muted',
	'--line',
	'--accent',
	'--accent-ink',
	'--strong',
	'--ring',
	'--accent-soft',
	'--bg-glass',
	'--code'
];

function clearTelegramColors() {
	for (const name of INLINE_PROPS) document.documentElement.style.removeProperty(name);
}

function applyScheme() {
	if (typeof document === 'undefined') return;
	const root = document.documentElement;
	tg = telegramApp();
	prefs.telegram = Boolean(tg);
	const telegramDark = tg?.colorScheme === 'dark';

	if (tg) {
		root.dataset.tg = '1';
		root.dataset.tgTheme = telegramDark ? 'dark' : 'light';
	} else {
		delete root.dataset.tg;
		delete root.dataset.tgTheme;
	}

	if (prefs.theme === 'system') {
		delete root.dataset.theme;
		if (tg) applyTelegramColors(telegramDark);
		else clearTelegramColors();
		prefs.systemDark = tg ? telegramDark : Boolean(media?.matches);
	} else {
		root.dataset.theme = prefs.theme;
		delete root.dataset.tgTheme;
		clearTelegramColors();
		prefs.systemDark = prefs.theme === 'dark';
	}

	const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
	if (meta) {
		meta.content =
			tg && prefs.theme === 'system'
				? (tg.themeParams?.bg_color ?? (telegramDark ? '#06142a' : '#eef5fb'))
				: prefs.theme === 'dark' || (prefs.theme === 'system' && prefs.systemDark)
					? '#06142a'
					: '#eef5fb';
	}
	if (tg && prefs.theme === 'system') {
		const header = tg.themeParams?.bg_color ?? (telegramDark ? '#06142a' : '#eef5fb');
		tg.setHeaderColor?.(header);
		tg.setBackgroundColor?.(header);
	}
}

/** Reads the remembered choices once; app.html already applied the scheme before paint. */
export function startPrefs() {
	if (started) return;
	started = true;
	const lang = read(LANG_KEY);
	prefs.lang =
		lang === 'de' || lang === 'en'
			? lang
			: navigator.language?.toLowerCase().startsWith('de')
				? 'de'
				: 'en';
	const theme = read(THEME_KEY);
	prefs.theme = theme === 'light' || theme === 'dark' ? theme : 'system';
	media = matchMedia('(prefers-color-scheme: dark)');
	media.addEventListener('change', applyScheme);
	tg = telegramApp();
	tg?.onEvent?.('themeChanged', applyScheme);
	applyScheme();
}

export function setLang(lang: Lang) {
	prefs.lang = lang;
	document.documentElement.lang = lang;
	write(LANG_KEY, lang);
}

export function setTheme(theme: Theme) {
	prefs.theme = theme;
	write(THEME_KEY, theme);
	applyScheme();
}

export function isDark() {
	return prefs.theme === 'dark' || (prefs.theme === 'system' && prefs.systemDark);
}
