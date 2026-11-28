/** Small wrapper around the Telegram WebApp SDK. Safe to call outside Telegram. */

interface TelegramWebApp {
	expand?: () => void;
	ready?: () => void;
	openLink?: (url: string, options?: { try_instant_view?: boolean }) => void;
	openTelegramLink?: (url: string) => void;
}

function app(): TelegramWebApp | undefined {
	if (typeof window === 'undefined') return undefined;
	return (window as unknown as { Telegram?: { WebApp?: TelegramWebApp } }).Telegram?.WebApp;
}

export function isTelegram(): boolean {
	return Boolean(app());
}

/** Fill the available height and hide the native browser chrome feel inside the WebView. */
export function startTelegram() {
	const tg = app();
	if (!tg) return;
	tg.expand?.();
	tg.ready?.();
}

/** In Telegram, use the native link opener; elsewhere keep the normal new tab. */
export function openExternal(href: string) {
	if (!/^https?:\/\//i.test(href)) return;
	const tg = app();
	if (tg) {
		if (/^https?:\/\/(?:t\.me|telegram\.me)\//i.test(href)) {
			if (tg.openTelegramLink) {
				tg.openTelegramLink(href);
				return;
			}
		} else if (tg.openLink) {
			tg.openLink(href);
			return;
		}
	}
	window.open(href, '_blank', 'noopener');
}
