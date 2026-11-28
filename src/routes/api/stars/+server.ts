import { createHmac } from 'node:crypto';
import { error, json } from '@sveltejs/kit';
import { PLANS, type PaidPlan } from '#lib/plans.js';
import { verifyTelegram } from '#lib/server/tg.js';

const token = process.env.TELEGRAM_BOT_TOKEN ?? '';

export async function POST({ request }) {
	const uid = verifyTelegram(request.headers.get('x-telegram-init-data') ?? '');
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
		// Verify the actual Telegram Stars payment through the bot API before granting access.
		const updates = await fetch(`https://api.telegram.org/bot${token}/getUpdates?limit=100`).then(
			(r) => r.json()
		);
		const paymentPayload = `mn:${selected}:${uid}`;
		const paid = (updates.result ?? []).some(
			(update: any) => update.message?.successful_payment?.invoice_payload === paymentPayload
		);
		if (!paid) throw error(402, 'Payment not confirmed');
		const exp = Date.now() + PLANS[selected].days * 86_400_000;
		const payload = Buffer.from(JSON.stringify({ plan: selected, uid, exp })).toString('base64url');
		const sig = createHmac('sha256', token).update(payload).digest('base64url');
		return json({ token: `${payload}.${sig}`, plan: selected, exp });
	}

	throw error(400, 'Unknown action');
}
