import { Marked, type Tokens } from 'marked';
import { DOCS, type DocMeta } from '../docs.js';
import type { Lang } from '../projects.js';

const SOURCES: Record<Lang, Record<string, string>> = {
	de: import.meta.glob('../docs/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>,
	en: import.meta.glob('../docs/en/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>
};

export interface Doc extends DocMeta {
	lang: Lang;
	title: string;
	html: string;
	toc: { id: string; text: string }[];
}

const escape = (text: string) =>
	text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const slugify = (text: string) =>
	text
		.toLowerCase()
		.replace(/ß/g, 'ss')
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

const plain = (text: string) =>
	text
		.replace(/[*_`]/g, '')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.trim();

/** Links between the handbook files and to their pictures, as served on this site */
function rewrite(href: string) {
	if (/^[a-z]+:/i.test(href) || href.startsWith('#')) return href;
	const [path, hash] = href.split('#');
	const anchor = hash ? `#${hash}` : '';
	if (path.startsWith('assets/')) return `/docs/${path.slice('assets/'.length)}`;
	if (path === 'README.md') return `/docs${anchor}`;
	if (path.endsWith('.md')) return `/docs/${path.slice(0, -3)}${anchor}`;
	return href;
}

function render(source: string, lang: Lang) {
	const toc: Doc['toc'] = [];
	const used = new Set<string>();
	const marked = new Marked({
		gfm: true,
		walkTokens(token) {
			if (token.type === 'link' || token.type === 'image') token.href = rewrite(token.href);
		},
		renderer: {
			heading({ tokens, depth, text }: Tokens.Heading) {
				const label = plain(text);
				let id = slugify(label) || (lang === 'de' ? 'abschnitt' : 'section');
				while (used.has(id)) id += '-';
				used.add(id);
				if (depth === 2) toc.push({ id, text: label });
				return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
			},
			link({ href, title, tokens }: Tokens.Link) {
				const external = /^https?:/.test(href);
				const extra = external ? ' target="_blank" rel="noopener"' : '';
				const hint = title ? ` title="${escape(title)}"` : '';
				return `<a href="${escape(href)}"${hint}${extra}>${this.parser.parseInline(tokens)}</a>`;
			},
			image({ href, title, text }: Tokens.Image) {
				const caption = title ? `<span class="caption">${escape(title)}</span>` : '';
				return `<span class="figure"><img src="${escape(href)}" alt="${escape(text)}" loading="lazy" decoding="async">${caption}</span>`;
			},
			code({ text, lang }: Tokens.Code) {
				if (lang === 'mermaid') {
					return `<pre class="diagram" data-mermaid="${escape(text)}">${escape(text)}</pre>\n`;
				}
				return `<pre class="diagram"><code>${escape(text)}</code></pre>\n`;
			}
		}
	});
	const html = (marked.parse(source, { async: false }) as string)
		.replace(/<table>/g, '<div class="table-wrap"><table>')
		.replace(/<\/table>/g, '</table></div>');
	return { html, toc };
}

/** One page in one language; both languages are shipped so the header switch is instant. */
export function loadDoc(slug: string, lang: Lang): Doc | undefined {
	const meta = DOCS.find((doc) => doc.slug === slug);
	const source = SOURCES[lang][`../docs/${lang === 'en' ? 'en/' : ''}${slug}.md`];
	if (!meta || source === undefined) return undefined;
	// The first heading becomes the page title, the rest is the body
	const match = source.match(/^#\s+(.+)\n/m);
	const title = match ? plain(match[1]) : meta.text[lang].name;
	const body = match ? source.replace(match[0], '') : source;
	return { ...meta, lang, title, ...render(body, lang) };
}

export function loadDocs(slug: string): Record<Lang, Doc> | undefined {
	if (!DOCS.some((doc) => doc.slug === slug)) return undefined;
	const de = loadDoc(slug, 'de');
	const en = loadDoc(slug, 'en');
	if (!de || !en) return undefined;
	return { de, en };
}
