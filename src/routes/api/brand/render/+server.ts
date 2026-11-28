import { error, json } from '@sveltejs/kit';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderBrandSvg, type BrandInput, type BrandVariant } from '#lib/brandTemplate.js';

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
	const variant: BrandVariant = body.variant === 'talk' ? 'talk' : 'wide';
	const accent = /^#[0-9a-fA-F]{6}$/.test(body.accent ?? '') ? body.accent! : '#2ec5ff';

	const font: 'hp' | 'blackout' | 'noto' =
		body.font === 'blackout' || body.font === 'noto' ? body.font : 'hp';
	const files = {
		hp: ['HPSimplified.ttf', 'font/ttf'],
		blackout: ['BlackedOut-Regular.otf', 'font/otf'],
		noto: ['NotoSans-Regular.ttf', 'font/ttf']
	} as const;
	const [fontFile, fontMime] = files[font];
	let fontData = '';
	let fontBuffer: ArrayBuffer | undefined;
	try {
		const bytes = await readFile(resolve(process.cwd(), 'static/fonts', fontFile));
		fontData = bytes.toString('base64');
		fontBuffer = Uint8Array.from(bytes).buffer;
	} catch {
		throw error(500, 'Brand font could not be loaded');
	}
	const input = { line1, line2, subline, variant, accent, font, fontData, fontMime, fontBuffer };
	// The downloadable SVG keeps editable <text>; PNG uses outlined glyphs because
	// librsvg/sharp does not honour @font-face data URLs.
	const svg = renderBrandSvg(input);
	const raster = renderBrandSvg({ ...input, outlineText: true });
	const png = await sharp(Buffer.from(raster)).png().toBuffer();

	return json({
		svg,
		svgUrl: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
		pngUrl: `data:image/png;base64,${png.toString('base64')}`
	});
}
