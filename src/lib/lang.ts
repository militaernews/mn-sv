import { goto } from '$app/navigation';
import { page } from '$app/state';
import type { Lang } from './projects.js';

const EN = '/en';

/** The URL is the source of truth for the language; `/en…` is English, everything else is German. */
export function langFromPath(pathname: string): Lang {
	return pathname === EN || pathname.startsWith(`${EN}/`) ? 'en' : 'de';
}

/** Map a German route to its English counterpart (and back). External URLs are left alone. */
export function localizedHref(href: string, lang: Lang): string {
	if (!href.startsWith('/')) return href;
	const [pathname, hash] = href.split('#');
	const suffix = hash ? `#${hash}` : '';
	let path: string;
	if (lang === 'de') {
		path = pathname === EN ? '/' : pathname.startsWith(`${EN}/`) ? pathname.slice(EN.length) : pathname;
	} else {
		path = pathname === '/' || pathname === '' ? EN : pathname.startsWith(EN) ? pathname : EN + pathname;
	}
	return path + suffix;
}

/** Switch language by navigating to the same page under the other URL. */
export function switchLang(lang: Lang) {
	if (lang === langFromPath(page.url.pathname)) return;
	return goto(localizedHref(page.url.pathname, lang) + page.url.hash);
}
