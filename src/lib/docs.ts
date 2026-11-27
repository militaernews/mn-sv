import type { Lang } from './projects.js';

/** The handbook pages, in reading order; each one is src/lib/docs/<slug>.md */
export interface DocMeta {
	slug: string;
	href: string;
	text: Record<Lang, { name: string; summary: string }>;
	/** The bot this page is about: avatar in static/img/bots and its Telegram username */
	bot?: { avatar: string; username: string };
}

export const DOCS: DocMeta[] = [
	{
		slug: 'index',
		href: '/docs',
		text: {
			de: { name: 'Übersicht', summary: 'Die drei Bots und wie sie zusammenspielen' },
			en: { name: 'Overview', summary: 'The three bots and how they work together' }
		}
	},
	{
		slug: 'ptb-mn',
		href: '/docs/ptb-mn',
		bot: { avatar: '/img/bots/ptb-mn.webp', username: 'MNPostingBot' },
		text: {
			de: { name: 'Posting-Bot', summary: 'Posten in elf Sprachen und auf X' },
			en: { name: 'Posting bot', summary: 'Posting in eleven languages and on X' }
		}
	},
	{
		slug: 'ptb-mnchat',
		href: '/docs/ptb-mnchat',
		bot: { avatar: '/img/bots/ptb-mnchat.webp', username: 'mn_manager_bot' },
		text: {
			de: { name: 'Community-Bot', summary: 'Karma, Moderation, Captcha und Freigaben' },
			en: { name: 'Community bot', summary: 'Karma, moderation, captcha and whitelists' }
		}
	},
	{
		slug: 'ptb-suggest',
		href: '/docs/ptb-suggest',
		bot: { avatar: '/img/bots/ptb-suggest.webp', username: 'mn_suggest_bot' },
		text: {
			de: { name: 'Vorschlags-Bot', summary: 'Quellen sammeln und Posts mit KI formulieren' },
			en: { name: 'Suggestion bot', summary: 'Collecting sources and writing posts with AI' }
		}
	}
];

/** Labels around the handbook that are not part of the markdown files */
export const DOC_UI: Record<
	Lang,
	{
		eyebrow: string;
		nav: string;
		botsTitle: string;
		toGuide: string;
		available: string;
		onThisPage: string;
	}
> = {
	de: {
		eyebrow: 'Handbuch',
		nav: 'Handbuch',
		botsTitle: 'Die drei Bots',
		toGuide: 'Zur Anleitung',
		available: 'Dieses Handbuch ist auch auf Englisch verfügbar – Sprachumschalter oben.',
		onThisPage: 'Auf dieser Seite'
	},
	en: {
		eyebrow: 'Handbook',
		nav: 'Handbook navigation',
		botsTitle: 'The three bots',
		toGuide: 'Read the guide',
		available: 'This handbook is also available in German — use the language switch above.',
		onThisPage: 'On this page'
	}
};
