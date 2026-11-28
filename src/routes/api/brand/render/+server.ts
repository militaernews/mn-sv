import { error, json } from '@sveltejs/kit';
import sharp from 'sharp';
import { renderBrandSvg, type BrandInput } from '#lib/brandTemplate.js';

export async function POST({ request }) {
	const body = (await request.json()) as Partial<BrandInput>;
	const line1 =
		String(body.line1 ?? '')
			.slice(0, 40)
			.trim() || 'MILITÄR';
	const line2 =
		String(body.line2 ?? '')
			.slice(0, 40)
			.trim() || 'NEWS';
	const subline = String(body.subline ?? '')
		.slice(0, 80)
		.trim();
	const variant = body.variant === 'talk' ? 'talk' : 'wide';
	const accent = /^#[0-9a-fA-F]{6}$/.test(body.accent ?? '') ? body.accent! : '#2ec5ff';

	const svg = renderBrandSvg({ line1, line2, subline, variant, accent });
	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return json({
		svg,
		svgUrl: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
		pngUrl: `data:image/png;base64,${png.toString('base64')}`
	});
}
