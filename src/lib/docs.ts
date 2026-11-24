/** The handbook pages, in reading order; each one is src/lib/docs/<slug>.md */
export interface DocMeta {
	slug: string;
	href: string;
	name: string;
	summary: string;
	/** The bot this page is about: avatar in static/img/bots and its Telegram username */
	bot?: { avatar: string; username: string };
}

export const DOCS: DocMeta[] = [
	{
		slug: 'index',
		href: '/docs',
		name: 'Übersicht',
		summary: 'Die drei Bots und wie sie zusammenspielen'
	},
	{
		slug: 'ptb-mn',
		href: '/docs/ptb-mn',
		bot: { avatar: '/img/bots/ptb-mn.webp', username: 'MNPostingBot' },
		name: 'Posting-Bot',
		summary: 'Posten in elf Sprachen und auf X'
	},
	{
		slug: 'ptb-mnchat',
		href: '/docs/ptb-mnchat',
		bot: { avatar: '/img/bots/ptb-mnchat.webp', username: 'mn_manager_bot' },
		name: 'Community-Bot',
		summary: 'Karma, Moderation, Captcha und Freigaben'
	},
	{
		slug: 'ptb-suggest',
		href: '/docs/ptb-suggest',
		bot: { avatar: '/img/bots/ptb-suggest.webp', username: 'mn_suggest_bot' },
		name: 'Vorschlags-Bot',
		summary: 'Quellen sammeln und Posts mit KI formulieren'
	}
];
