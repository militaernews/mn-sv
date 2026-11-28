import { createHmac } from 'node:crypto';

export function verifyTelegram(initData: string): number | null {
	const token = process.env.TELEGRAM_BOT_TOKEN ?? '';
	if (!token || !initData) return null;
	const params = new URLSearchParams(initData);
	const hash = params.get('hash') ?? '';
	params.delete('hash');
	const check = [...params.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([key, value]) => `${key}=${value}`)
		.join('\n');
	const secret = createHmac('sha256', 'WebAppData').update(token).digest();
	if (createHmac('sha256', secret).update(check).digest('hex') !== hash) return null;
	try {
		const user = JSON.parse(params.get('user') ?? 'null');
		return typeof user?.id === 'number' ? user.id : null;
	} catch {
		return null;
	}
}

export function isAdmin(uid: number): boolean {
	return new Set(
		(process.env.TELEGRAM_ADMIN_IDS ?? '')
			.split(',')
			.map((value) => Number(value.trim()))
			.filter(Number.isFinite)
	).has(uid);
}
