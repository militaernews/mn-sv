import type { Component } from 'svelte';
import IconBookOpen from '~icons/lucide/book-open';
import IconMap from '~icons/lucide/map';
import IconChart from '~icons/lucide/chart-column';
import IconGlobe from '~icons/lucide/globe';
import IconLanguages from '~icons/lucide/languages';
import IconScanEye from '~icons/lucide/scan-eye';
import IconRadio from '~icons/lucide/radio';
import IconMegaphone from '~icons/lucide/megaphone';
import IconUsersRound from '~icons/lucide/users-round';

export type Lang = 'de' | 'en';
export const LANGS: Lang[] = ['de', 'en'];

export const CONTACT = 'https://t.me/MilitaernewsKontakt';

/** The MilitärNews language channels, in the order the posting pipeline serves them */
export interface Channel {
	flag: string;
	language: Record<Lang, string>;
	username: string;
	x?: string;
}

export const CHANNELS: Channel[] = [
	{
		flag: '🇩🇪',
		language: { de: 'Deutsch', en: 'German' },
		username: 'MilitaerNews',
		x: 'MilitaerNews'
	},
	{
		flag: '🇺🇸',
		language: { de: 'Englisch', en: 'English' },
		username: 'MilitaryNewsEN',
		x: 'MilitaryNewsEN'
	},
	{ flag: '🇹🇷', language: { de: 'Türkisch', en: 'Turkish' }, username: 'MilitaryNewsTR' },
	{ flag: '🇮🇷', language: { de: 'Persisch', en: 'Persian' }, username: 'MilitaryNewsFA' },
	{ flag: '🇷🇺', language: { de: 'Russisch', en: 'Russian' }, username: 'MilitaryNewsRU' },
	{ flag: '🇧🇷', language: { de: 'Portugiesisch', en: 'Portuguese' }, username: 'MilitaryNewsBR' },
	{ flag: '🇪🇸', language: { de: 'Spanisch', en: 'Spanish' }, username: 'MilitaryNewsES' },
	{ flag: '🇫🇷', language: { de: 'Französisch', en: 'French' }, username: 'MilitaryNewsFR' },
	{ flag: '🇮🇹', language: { de: 'Italienisch', en: 'Italian' }, username: 'MilitaryNewsITA' },
	{ flag: '🇪🇬', language: { de: 'Arabisch', en: 'Arabic' }, username: 'MilitaryNewsAR' },
	{ flag: '🇮🇩', language: { de: 'Indonesisch', en: 'Indonesian' }, username: 'MilitaryNewsIDN' }
];

/** TGStat-style community metrics tracked by the MNChat bot (user_stats) */
export interface CommunityStat {
	label: Record<Lang, string>;
	value: string;
}

export const COMMUNITY_STATS: CommunityStat[] = [
	{ label: { de: 'Beiträge je Nutzer', en: 'Posts per user' }, value: '⌀ 42' },
	{ label: { de: 'Wörter je Beitrag', en: 'Words per post' }, value: '⌀ 18' },
	{ label: { de: 'Zeichen je Beitrag', en: 'Characters per post' }, value: '⌀ 126' },
	{ label: { de: 'Karma-Punkte', en: 'Karma points' }, value: 'live' }
];

interface Text {
	name: string;
	audience: string;
	tagline: string;
	description: string;
	features: string[];
	cta: string;
}

export type ProjectKind = 'tool' | 'game' | 'bot' | 'guide';

export interface Project {
	id: string;
	kind: ProjectKind;
	/** An image in static/img, or an icon when the project has no picture */
	image?: string;
	icon?: Component;
	href: string;
	text: Record<Lang, Text>;
}

export const PROJECTS: Project[] = [
	{
		id: 'newsmix',
		kind: 'tool',
		image: '/img/newsmix.webp',
		href: 'https://mix-sv.vercel.app',
		text: {
			de: {
				name: 'Newsmix',
				audience: 'Für die Redaktion',
				tagline: 'Hunderte Nachrichtenkanäle, ein Feed je Region',
				description:
					'Newsmix liest rund um die Uhr Nachrichtenkanäle aus aller Welt mit, übersetzt jede Meldung ins Deutsche und sortiert sie in Kanäle nach Region und Thema: Ukraine, Naher Osten, Asien, Afrika, Kaukasus, Südamerika und mehr.',
				features: [
					'Meldungen auf Deutsch, Minuten nach dem Original',
					'Werbezeilen und Füllsel der Quellen sind schon entfernt',
					'Jede Meldung landet im Kanal ihrer Region',
					'Alle Quellen mit Einordnung auf einen Blick'
				],
				cta: 'Quellen ansehen'
			},
			en: {
				name: 'Newsmix',
				audience: 'For editors',
				tagline: 'Hundreds of news channels, one feed per region',
				description:
					'Newsmix follows news channels from all over the world around the clock, translates every report into German and sorts it into channels by region and topic: Ukraine, the Middle East, Asia, Africa, the Caucasus, South America and more.',
				features: [
					'Reports in German, minutes after the original',
					'Promo lines and filler from the sources already removed',
					'Every report lands in the channel for its region',
					'Every source and how it is rated, at a glance'
				],
				cta: 'Browse the sources'
			}
		}
	},
	{
		id: 'viz',
		kind: 'tool',
		image: '/img/viz.webp',
		href: 'https://viz-sv.vercel.app',
		text: {
			de: {
				name: 'viz',
				audience: 'Für die Redaktion',
				tagline: 'Wo ist dieses Bild zuerst aufgetaucht?',
				description:
					'Lade ein Foto hoch oder beschreibe es in Worten: viz durchsucht die Kanäle und zeigt den frühesten Beitrag mit diesem Bild, mit Vorschau und Link zum Post. So lässt sich die Herkunft eines Bildes in Sekunden prüfen.',
				features: [
					'Findet auch zugeschnittene und neu komprimierte Kopien',
					'Suche per Foto oder per Beschreibung',
					'Durchsucht die gesamte Geschichte der Kanäle',
					'Neue Beiträge sind sofort auffindbar'
				],
				cta: 'viz öffnen'
			},
			en: {
				name: 'viz',
				audience: 'For editors',
				tagline: 'Where did this picture show up first?',
				description:
					'Upload a photo or describe it in words: viz searches the channels and shows the earliest post with that picture, with a preview and a link to the post. Checking where a picture comes from takes seconds.',
				features: [
					'Also finds cropped and re-compressed copies',
					'Search by photo or by description',
					'Covers the channels’ whole history',
					'New posts are searchable right away'
				],
				cta: 'Open viz'
			}
		}
	},
	{
		id: 'footer',
		kind: 'bot',
		image: '/img/footer.webp',
		href: 'https://t.me/nyx_footer_bot',
		text: {
			de: {
				name: 'Footer Bot',
				audience: 'Für Kanalbetreiber',
				tagline: 'Deine Signatur unter jedem Kanalbeitrag',
				description:
					'Mach den Bot zum Admin deines Kanals, und er setzt deinen Footer automatisch unter jeden neuen Beitrag, mit Links und Formatierung. So trägt jede Weiterleitung den Namen deines Kanals.',
				features: [
					'Eigener Footer für jeden deiner Kanäle',
					'Du bestimmst, welche Beiträge einen Footer bekommen',
					'Bei Bildergalerien nur einmal',
					'Einrichtung in zwei Minuten, direkt im Chat'
				],
				cta: 'Bot starten'
			},
			en: {
				name: 'Footer Bot',
				audience: 'For channel owners',
				tagline: 'Your signature under every channel post',
				description:
					'Make the bot an admin of your channel and it adds your footer to every new post, with links and formatting, so every forward still carries your channel’s name.',
				features: [
					'A footer of its own for each of your channels',
					'You choose which posts get a footer',
					'Albums get it only once',
					'Set up in two minutes, right in the chat'
				],
				cta: 'Start the bot'
			}
		}
	},
	{
		id: 'litfass',
		kind: 'bot',
		image: '/img/litfass.webp',
		href: 'https://t.me/litfass_advertisement_bot',
		text: {
			de: {
				name: 'litfass',
				audience: 'Für Werbende und Kanäle',
				tagline: 'Eigenwerbung ohne Werbenetzwerk',
				description:
					'Werbung für eigene Kanäle und Partner, verwaltet in einem Telegram-Bot und ausgespielt in Spielen, Mini Apps, Bots und Kanälen, die zum Inhalt passen. Ohne Tracking, ohne Cookies, ohne Profile.',
				features: [
					'Anzeigen nur dort, wo sie thematisch passen',
					'Als Karte, Banner oder Poster in deinen Farben',
					'Aufrufe und Klicks als Tagesübersicht im Bot',
					'Klar als „Anzeige“ gekennzeichnet'
				],
				cta: 'Bot starten'
			},
			en: {
				name: 'litfass',
				audience: 'For advertisers and channels',
				tagline: 'House adverts without an ad network',
				description:
					'Adverts for your own channels and partners, managed in a Telegram bot and shown in games, Mini Apps, bots and channels whose content fits. No tracking, no cookies, no profiles.',
				features: [
					'Adverts only where the topic fits',
					'As a card, banner or poster in your colours',
					'Views and clicks per day, right in the bot',
					'Clearly labelled as an advert'
				],
				cta: 'Start the bot'
			}
		}
	},
	{
		id: 'tartaros',
		kind: 'bot',
		image: '/img/tartaros.webp',
		href: 'https://t.me/tartaros_report_bot',
		text: {
			de: {
				name: 'Tartaros',
				audience: 'Für Gruppenadmins',
				tagline: 'Eine gemeinsame Sperrliste gegen Spammer und Betrüger',
				description:
					'Gruppen melden Spammer und Betrüger an eine gemeinsame Liste, und alle teilnehmenden Gruppen erkennen sie, bevor sie Schaden anrichten. Ab in die Tiefen des Tartaros.',
				features: [
					'Verdächtige Nutzer direkt in Telegram melden',
					'Jede Meldung wird geprüft, bevor sie zählt',
					'Ein Betrüger, der einmal auffliegt, ist überall bekannt',
					'Für Gruppen jeder Größe'
				],
				cta: 'Bot starten'
			},
			en: {
				name: 'Tartaros',
				audience: 'For group admins',
				tagline: 'A shared blacklist of spammers and scammers',
				description:
					'Groups report spammers and scammers to one shared list, and every participating group recognises them before they do harm. Straight into the depths of Tartaros.',
				features: [
					'Report suspicious users right in Telegram',
					'Every report is reviewed before it counts',
					'A scammer caught once is known everywhere',
					'For groups of any size'
				],
				cta: 'Start the bot'
			}
		}
	},
	{
		id: 'geo',
		kind: 'tool',
		icon: IconMap,
		href: 'https://geo-mn.vercel.app',
		text: {
			de: {
				name: 'Karten',
				audience: 'Für die Redaktion',
				tagline: 'Lagekarten für Beiträge in wenigen Minuten',
				description:
					'Markiere Orte, Frontlinien und Gebiete auf einer Karte und lade sie als fertiges Bild herunter, im Stil der MilitärNews-Kanäle. Das Bild schickst du dann wie jedes andere Foto mit deinem Beitrag.',
				features: [
					'Orte, Linien und Flächen per Klick',
					'Einheitlicher Kartenstil für alle Kanäle',
					'Download als Bild, direkt im Browser',
					'Auch als Mini-App im Vorschlags-Bot'
				],
				cta: 'Karte erstellen'
			},
			en: {
				name: 'Maps',
				audience: 'For editors',
				tagline: 'Situation maps for posts in minutes',
				description:
					'Mark places, front lines and areas on a map and download it as a finished picture in the style of the MilitärNews channels. Then send it with your post like any other photo.',
				features: [
					'Places, lines and areas with a click',
					'One map style across all channels',
					'Download as a picture, right in the browser',
					'Also a mini app in the suggestion bot'
				],
				cta: 'Make a map'
			}
		}
	},
	{
		id: 'charts',
		kind: 'tool',
		icon: IconChart,
		href: 'https://chart-mn.vercel.app',
		text: {
			de: {
				name: 'Diagramme',
				audience: 'Für die Redaktion',
				tagline: 'Zahlen auf einen Blick, als Bild für den Kanal',
				description:
					'Trage Zahlen ein, etwa Verluste, Lieferungen oder Abschüsse, und erhalte ein sauberes Diagramm im MilitärNews-Stil. Herunterladen und mit dem Beitrag senden.',
				features: [
					'Balken-, Linien- und weitere Diagramme',
					'Farben und Schrift passend zu den Kanälen',
					'Download als Bild, direkt im Browser',
					'Auch als Mini-App im Vorschlags-Bot'
				],
				cta: 'Diagramm erstellen'
			},
			en: {
				name: 'Charts',
				audience: 'For editors',
				tagline: 'Numbers at a glance, as a picture for the channel',
				description:
					'Enter figures such as losses, deliveries or shoot-downs and get a clean chart in the MilitärNews style. Download it and send it with your post.',
				features: [
					'Bar, line and other charts',
					'Colours and type matching the channels',
					'Download as a picture, right in the browser',
					'Also a mini app in the suggestion bot'
				],
				cta: 'Make a chart'
			}
		}
	},
	{
		id: 'ww3',
		kind: 'game',
		image: '/img/ww3.svg',
		href: 'https://ww3-sv.vercel.app',
		text: {
			de: {
				name: 'World War 3',
				audience: 'Für Leser',
				tagline: 'Satirische Spiele rund um Öl, Schiffe und Weltpolitik',
				description:
					'Eine Sammlung kleiner Cartoon-Rätsel und Arcade-Spiele, die das Weltgeschehen auf die Schippe nimmt. Läuft im Browser und als Telegram-Spiel, mit Bestenlisten für Gruppen.',
				features: [
					'Rund 50 Spielmodi',
					'Im Browser oder direkt in Telegram',
					'Bestenliste für jeden Gruppenchat',
					'In sechs Sprachen'
				],
				cta: 'Jetzt spielen'
			},
			en: {
				name: 'World War 3',
				audience: 'For readers',
				tagline: 'Satirical games about oil, shipping and world politics',
				description:
					'A collection of small cartoon puzzles and arcade games that pokes fun at world events. Plays in the browser and as a Telegram game, with leaderboards for groups.',
				features: [
					'Around 50 game modes',
					'In the browser or right inside Telegram',
					'A leaderboard for every group chat',
					'In six languages'
				],
				cta: 'Play now'
			}
		}
	},
	{
		id: 'docs',
		kind: 'guide',
		icon: IconBookOpen,
		href: '/docs',
		text: {
			de: {
				name: 'Handbuch',
				audience: 'Für Redaktion und Admins',
				tagline: 'Die Anleitung zu den MilitärNews-Bots',
				description:
					'Wie Redaktion, Admins und Community die Bots im Alltag nutzen: Beiträge in elf Sprachen veröffentlichen, KI-Vorschläge übernehmen und die Community-Gruppe moderieren. Mit Abläufen, Befehlen und Hilfe bei Problemen.',
				features: [
					'Posten in elf Sprachen und auf X',
					'Nachrichtenvorschläge, mit KI formuliert',
					'Karma, Moderation, Captcha und Freigaben',
					'Tipps und Lösungen für häufige Probleme'
				],
				cta: 'Handbuch lesen'
			},
			en: {
				name: 'Handbook',
				audience: 'For editors and admins',
				tagline: 'The guide to the MilitärNews bots',
				description:
					'How editors, admins and the community use the bots day to day: publishing posts in eleven languages, taking over AI suggestions and moderating the community group. With workflows, commands and help with problems.',
				features: [
					'Posting in eleven languages and to X',
					'News suggestions written with AI',
					'Karma, moderation, captcha and whitelists',
					'Tips and fixes for common problems'
				],
				cta: 'Read the handbook'
			}
		}
	}
];

export const UI: Record<
	Lang,
	{
		title: string;
		description: string;
		eyebrow: string;
		lead: string;
		flowTitle: string;
		flow: { label: string; detail: string; icon: Component }[];
		toolsTitle: string;
		toolsText: string;
		gamesTitle: string;
		gamesText: string;
		botsTitle: string;
		botsText: string;
		channelsTitle: string;
		channelsText: string;
		statsTitle: string;
		statsText: string;
		guideTitle: string;
		guideText: string;
		contactTitle: string;
		contactText: string;
		contactCta: string;
		footer: string;
	}
> = {
	de: {
		title: 'MilitärNews Werkzeuge',
		description:
			'Die Werkzeuge hinter den MilitärNews-Kanälen: Nachrichten aus aller Welt, Bildersuche, Schutz vor Spammern und Werbung für Telegram.',
		eyebrow: 'Werkzeuge für Redaktion & Community',
		lead: 'Die Werkzeuge hinter den MilitärNews-Kanälen: Nachrichten aus aller Welt, Bildersuche, Schutz vor Spammern und Werbung für Telegram-Kanäle und Bots.',
		flowTitle: 'Von der Quelle in den Kanal',
		flow: [
			{ label: 'Quellen', detail: 'Nachrichtenkanäle weltweit', icon: IconGlobe },
			{ label: 'Newsmix', detail: 'übersetzt und sortiert', icon: IconLanguages },
			{ label: 'Redaktion', detail: 'prüft mit viz, wählt aus', icon: IconScanEye },
			{ label: 'MilitärNews', detail: 'in elf Sprachen', icon: IconRadio },
			{ label: 'Werbung', detail: 'litfass & Footer für Kanäle', icon: IconMegaphone },
			{ label: 'Leser', detail: 'erreicht über elf Sprachkanäle', icon: IconUsersRound }
		],
		toolsTitle: 'Tools',
		toolsText: 'Im Browser öffnen – für Nachrichten, Bilder, Karten und Zahlen.',
		gamesTitle: 'Games',
		gamesText:
			'Satirische Spiele rund um Öl, Schiffe und Weltpolitik – im Browser und in Telegram.',
		botsTitle: 'Telegram-Bots',
		botsText: 'Direkt im Chat – für Kanäle, Werbung und Gruppen.',
		channelsTitle: 'Die Kanäle',
		channelsText: 'Elf Sprachkanäle, die aus einem deutschen Post entstehen. Ein Klick genügt.',
		statsTitle: 'Community in Zahlen',
		statsText: 'TGStat-Daten aus der Community-Gruppe: Aktivität und Karma auf einen Blick.',
		guideTitle: 'Handbuch',
		guideText: 'Alles Wichtige zur Arbeit mit den Bots – auf Deutsch und Englisch.',
		contactTitle: 'Fragen oder Interesse?',
		contactText:
			'Du möchtest Zugang zu Newsmix, Werbung über litfass schalten oder einen der Bots in deinem Kanal einsetzen? Schreib uns.',
		contactCta: 'Kontakt aufnehmen',
		footer: 'MilitärNews'
	},
	en: {
		title: 'MilitärNews tools',
		description:
			'The tools behind the MilitärNews channels: news from all over the world, picture search, protection from spammers and adverts for Telegram.',
		eyebrow: 'Tools for editors & community',
		lead: 'The tools behind the MilitärNews channels: news from all over the world, picture search, protection from spammers and adverts for Telegram channels and bots.',
		flowTitle: 'From the source to the channel',
		flow: [
			{ label: 'Sources', detail: 'news channels worldwide', icon: IconGlobe },
			{ label: 'Newsmix', detail: 'translates and sorts', icon: IconLanguages },
			{ label: 'Editors', detail: 'check with viz, pick', icon: IconScanEye },
			{ label: 'MilitärNews', detail: 'in eleven languages', icon: IconRadio },
			{ label: 'Advertising', detail: 'litfass & footers for channels', icon: IconMegaphone },
			{ label: 'Readers', detail: 'reached across eleven language channels', icon: IconUsersRound }
		],
		toolsTitle: 'Tools',
		toolsText: 'Open in your browser — for news, pictures, maps and numbers.',
		gamesTitle: 'Games',
		gamesText:
			'Satirical games about oil, shipping and world politics — in the browser and in Telegram.',
		botsTitle: 'Telegram bots',
		botsText: 'Right in the chat — for channels, adverts and groups.',
		channelsTitle: 'The channels',
		channelsText:
			'Eleven language channels born from a single German post. One click is all it takes.',
		statsTitle: 'Community in numbers',
		statsText: 'TGStat data from the community group: activity and karma at a glance.',
		guideTitle: 'Handbook',
		guideText: 'Everything you need to work with the bots — in German and English.',
		contactTitle: 'Questions or interested?',
		contactText:
			'Want access to Newsmix, adverts through litfass or one of the bots in your channel? Write to us.',
		contactCta: 'Get in touch',
		footer: 'MilitärNews'
	}
};
