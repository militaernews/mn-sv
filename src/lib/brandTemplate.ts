import opentype from 'opentype.js';

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
	/** Font bytes used for measuring and, for PNG, for drawing glyph outlines. */
	fontBuffer?: ArrayBuffer;
	/** Draw text as paths instead of editable <text>. Needed for renderers without @font-face. */
	outlineText?: boolean;
}

const FONT_FAMILY = 'BrandFont';

const esc = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const BASE_SPACING = 6;
const SUB_SPACING = 4;

/** Measure a line in font units so the layout fits regardless of the chosen font's widths. */
function textWidth(font: opentype.Font, value: string, size: number, spacing: number): number {
	const scale = size / font.unitsPerEm;
	const glyphs = Array.from(value).map(
		(char) => font.charToGlyph(char) ?? font.charToGlyph(String.fromCharCode(0))
	);
	const advance = glyphs.reduce((total, glyph) => total + (glyph.advanceWidth ?? 0) * scale, 0);
	return advance + Math.max(0, glyphs.length - 1) * spacing;
}

/** Lay out glyph outlines on a baseline, centred and spaced like the editable <text>. */
function outlinedText(
	font: opentype.Font,
	value: string,
	x: number,
	y: number,
	size: number,
	spacing: number,
	fill: string
): string {
	const scale = size / font.unitsPerEm;
	const glyphs = Array.from(value).map(
		(char) => font.charToGlyph(char) ?? font.charToGlyph(String.fromCharCode(0))
	);
	// getPath() rewrites advanceWidth for CFF fonts — capture widths first.
	const advances = glyphs.map((glyph) => glyph.advanceWidth ?? 0);
	const width = textWidth(font, value, size, spacing);
	let cursor = x - width / 2;
	const paths = glyphs.map((glyph, index) => {
		const data = glyph.getPath(cursor, y, size)?.toPathData(1) ?? '';
		const path = `<path d="${data}" fill="${fill}"/>`;
		cursor += advances[index] * scale + spacing;
		return path;
	});
	return paths.join('');
}

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

	const font = input.fontBuffer ? opentype.parse(input.fontBuffer) : undefined;
	const lineSize = wide ? 180 : 130;
	const subSize = wide ? 34 : 30;
	let scale = 1;
	if (font) {
		const maxWidth = width * 0.86;
		const widest = Math.max(
			textWidth(font, input.line1, lineSize, BASE_SPACING),
			textWidth(font, input.line2, lineSize, BASE_SPACING),
			input.subline ? textWidth(font, input.subline, subSize, SUB_SPACING) : 0
		);
		if (widest > maxWidth) scale = maxWidth / widest;
	}
	const fontSize = lineSize * scale;
	const subtitleSize = subSize * scale;
	// Extra space below each baseline so descenders (g, p, ß) are never clipped.
	const line2Y = cy + fontSize * 1.05;
	const subtitleY = line2Y + fontSize * 0.62;

	const text = (
		value: string,
		y: number,
		size: number,
		spacing: number,
		fill: string,
		family: string,
		weight: number
	) =>
		font && input.outlineText
			? outlinedText(font, value, cx, y, size, spacing, fill)
			: `<text x="${cx}" y="${y}" text-anchor="middle" font-family="${family}" font-weight="${weight}" font-size="${size.toFixed(1)}" fill="${fill}" letter-spacing="${spacing}">${esc(value)}</text>`;

	const lineFamily = `${FONT_FAMILY}, Impact, sans-serif`;
	const subFamily = `${FONT_FAMILY}, sans-serif`;

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
${input.fontData ? `<style>@font-face{font-family:'${FONT_FAMILY}';src:url(data:${input.fontMime ?? 'font/ttf'};base64,${input.fontData});}</style>` : ''}
<rect width="${width}" height="${height}" fill="#06142a"/>
<circle cx="${cx}" cy="${cy}" r="${radius}" fill="#0d2648" stroke="${esc(input.accent)}" stroke-opacity="0.6" stroke-width="3"/>
${rings}
<line x1="${cx}" y1="${cy - radius}" x2="${cx}" y2="${cy + radius}" stroke="#9be7ff" stroke-opacity="0.22" stroke-width="2"/>
<line x1="${cx - radius}" y1="${cy}" x2="${cx + radius}" y2="${cy}" stroke="#9be7ff" stroke-opacity="0.22" stroke-width="2"/>
${ticks}
<path d="M${cx} ${cy} L${cx} ${cy - radius * 0.92} A${(radius * 0.92).toFixed(1)} ${(radius * 0.92).toFixed(1)} 0 0 1 ${(cx + radius * 0.55).toFixed(1)} ${(cy - radius * 0.7).toFixed(1)} Z" fill="${esc(input.accent)}" fill-opacity="0.16"/>
${text(input.line1, cy, fontSize, BASE_SPACING, '#f2fbff', lineFamily, 900)}
${text(input.line2, line2Y, fontSize, BASE_SPACING, '#f2fbff', lineFamily, 900)}
${input.subline ? text(input.subline, subtitleY, subtitleSize, SUB_SPACING, esc(input.accent), subFamily, 700) : ''}
</svg>`;
}
