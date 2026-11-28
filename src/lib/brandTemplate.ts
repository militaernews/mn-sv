export type BrandVariant = 'wide' | 'talk';

export interface BrandInput {
	line1: string;
	line2: string;
	subline: string;
	variant: BrandVariant;
	accent: string;
	font?: 'hp' | 'blackout' | 'noto';
	fontData?: string;
	fontMime?: string;
}

const FONT_FAMILY = 'BrandFont';

const esc = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function renderBrandSvg(input: BrandInput): string {
	const wide = input.variant === 'wide';
	const width = wide ? 1600 : 1080;
	const height = wide ? 900 : 1080;
	const cx = width / 2;
	const cy = height / 2;
	const radius = Math.min(width, height) * 0.46;
	const rings = [0.32, 0.5, 0.68, 0.86]
		.map(
			(factor) =>
				`<circle cx="${cx}" cy="${cy}" r="${(radius * factor).toFixed(1)}" fill="none" stroke="#9be7ff" stroke-opacity="0.28" stroke-width="2"/>`
		)
		.join('');
	const ticks = Array.from({ length: 72 }, (_, index) => {
		const angle = (index / 72) * Math.PI * 2;
		const inner = radius * 0.92;
		const outer = radius * (index % 6 === 0 ? 1 : 0.96);
		const x1 = (cx + Math.cos(angle) * inner).toFixed(1);
		const y1 = (cy + Math.sin(angle) * inner).toFixed(1);
		const x2 = (cx + Math.cos(angle) * outer).toFixed(1);
		const y2 = (cy + Math.sin(angle) * outer).toFixed(1);
		return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#9be7ff" stroke-opacity="0.45" stroke-width="2"/>`;
	}).join('');
	const fontSize = wide ? 180 : 130;
	const line2Y = cy + fontSize * 0.92;
	const subtitleY = line2Y + fontSize * 0.7;

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
${input.fontData ? `<style>@font-face{font-family:'${FONT_FAMILY}';src:url(data:${input.fontMime ?? 'font/ttf'};base64,${input.fontData});}</style>` : ''}
<rect width="${width}" height="${height}" fill="#06142a"/>
<circle cx="${cx}" cy="${cy}" r="${radius}" fill="#0d2648" stroke="${esc(input.accent)}" stroke-opacity="0.6" stroke-width="3"/>
${rings}
<line x1="${cx}" y1="${cy - radius}" x2="${cx}" y2="${cy + radius}" stroke="#9be7ff" stroke-opacity="0.22" stroke-width="2"/>
<line x1="${cx - radius}" y1="${cy}" x2="${cx + radius}" y2="${cy}" stroke="#9be7ff" stroke-opacity="0.22" stroke-width="2"/>
${ticks}
<path d="M${cx} ${cy} L${cx} ${cy - radius * 0.92} A${(radius * 0.92).toFixed(1)} ${(radius * 0.92).toFixed(1)} 0 0 1 ${(cx + radius * 0.55).toFixed(1)} ${(cy - radius * 0.7).toFixed(1)} Z" fill="${esc(input.accent)}" fill-opacity="0.16"/>
<text x="${cx}" y="${cy}" text-anchor="middle" font-family="${FONT_FAMILY}, Impact, sans-serif" font-weight="900" font-size="${fontSize}" fill="#f2fbff" letter-spacing="6">${esc(input.line1)}</text>
<text x="${cx}" y="${line2Y}" text-anchor="middle" font-family="${FONT_FAMILY}, Impact, sans-serif" font-weight="900" font-size="${fontSize}" fill="#f2fbff" letter-spacing="6">${esc(input.line2)}</text>
${input.subline ? `<text x="${cx}" y="${subtitleY}" text-anchor="middle" font-family="${FONT_FAMILY}, sans-serif" font-weight="700" font-size="${wide ? 34 : 30}" fill="${esc(input.accent)}" letter-spacing="4">${esc(input.subline)}</text>` : ''}
</svg>`;
}
