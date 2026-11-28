import { Marked } from 'marked';
import type { Lang } from '../projects.js';

const SOURCES: Record<Lang, Record<string, string>> = {
	de: import.meta.glob('../legal/de/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>,
	en: import.meta.glob('../legal/en/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>
};

const marked = new Marked({ gfm: true });

export function loadLegal(slug: string, lang: Lang): string | undefined {
	const source = SOURCES[lang][`../legal/${lang}/${slug}.md`];
	return source ? (marked.parse(source, { async: false }) as string) : undefined;
}
