import { createHmac } from 'node:crypto';
import { error, json } from '@sveltejs/kit';
import { PLANS, type PaidPlan } from '#lib/plans.js';

const token = process.env.TELEGRAM_BOT_TOKEN ?? '';

function verify(initData: string): number | null {
	if (!token || !initData) return null;
	const params = new URLSearchParams(initData);
	const hash = params.get('hash') ?? '';
	params.delete('hash');
	const check = [...params.entries()]
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([key, value]) => `${key}=${value}`)
		.join('\n');
	const secret = createHmac('sha256', 'WebAppData').update(token).digest();
	const expected = createHmac('sha256', secret).update(check).digest('hex');
	if (expected !== hash) return null;
	try {
		const user = JSON.parse(params.get('user') ?? 'null');
		return typeof user?.id === 'number' ? user.id : null;
	} catch {
		return null;
	}
}

export async function POST({ request }) {
	const uid = verify(request.headers.get('x-telegram-init-data') ?? '');
	if (!uid) throw error(401, 'Invalid Telegram launch data');

	const { action, plan } = (await request.json()) as { action?: string; plan?: string };
	if (!plan || !(plan in PLANS)) throw error(400, 'Unknown plan');
	const selected = plan as PaidPlan;

	if (action === 'invoice') {
		const response = await fetch(`https://api.telegram.org/bot${token}/createInvoiceLink`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				title: `MilitärNews ${selected.toUpperCase()}`,
				description: `30-day ${selected.toUpperCase()} pass`,
				payload: `mn:${selected}:${uid}`,
				currency: 'XTR',
				prices: [{ label: `${selected.toUpperCase()} · 30 days`, amount: PLANS[selected].stars }]
			})
		});
		const data = await response.json();
		if (!data.ok) throw error(502, 'Could not create invoice');
		return json({ url: data.result });
	}

	if (action === 'activate') {
		const exp = Date.now() + PLANS[selected].days * 86_400_000;
		const payload = Buffer.from(JSON.stringify({ plan: selected, uid, exp })).toString('base64url');
		const sig = createHmac('sha256', token).update(payload).digest('base64url');
		return json({ token: `${payload}.${sig}`, plan: selected, exp });
	}

	throw error(400, 'Unknown action');
}
