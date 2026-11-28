import { describe, expect, test } from 'bun:test';
import { renderBrandSvg } from '../../src/lib/brandTemplate.js';

const base = {
	line1: 'MILITÄR',
	line2: 'NEWS',
	subline: '',
	variant: 'wide' as const,
	accent: '#2ec5ff'
};

const fontSize = (svg: string) => Number(svg.match(/font-size="([\d.]+)"/)?.[1] ?? 0);

describe('brand template', () => {
	test('uses the wide canvas and keeps text editable', () => {
		const svg = renderBrandSvg(base);
		expect(svg).toContain('viewBox="0 0 1600 900"');
		expect(svg).toContain('<text');
		expect(svg).toContain('MILITÄR');
	});

	test('uses the square canvas for the talk variant', () => {
		const svg = renderBrandSvg({ ...base, variant: 'talk' });
		expect(svg).toContain('viewBox="0 0 1080 1080"');
	});

	test('escapes user text', () => {
		const svg = renderBrandSvg({ ...base, line1: '<script>&"</script>' });
		expect(svg).not.toContain('<script>');
		expect(svg).toContain('&lt;script&gt;&amp;&quot;&lt;/script&gt;');
	});

	test('omits the subline when empty', () => {
		expect(renderBrandSvg(base).match(/<text/g)).toHaveLength(2);
		expect(renderBrandSvg({ ...base, subline: 'Sub' }).match(/<text/g)).toHaveLength(3);
	});

	test('draws glyph outlines in PNG mode', async () => {
		const fontBuffer = await Bun.file('static/fonts/BlackedOut-Regular.otf').arrayBuffer();
		const svg = renderBrandSvg({ ...base, line1: 'Ä–G', fontBuffer, outlineText: true });
		expect(svg).not.toContain('<text');
		expect((svg.match(/<path/g) ?? []).length).toBeGreaterThan(4);
	});

	test('shrinks long lines to fit the canvas', async () => {
		const fontBuffer = await Bun.file('static/fonts/BlackedOut-Regular.otf').arrayBuffer();
		const short = fontSize(renderBrandSvg({ ...base, fontBuffer }));
		const long = fontSize(
			renderBrandSvg({ ...base, line1: 'MILITÄR–NEWS MILITÄR–NEWS MILITÄR–NEWS', fontBuffer })
		);
		expect(short).toBe(180);
		expect(long).toBeLessThan(short);
	});

	test('keeps descenders inside the canvas', async () => {
		const fontBuffer = await Bun.file('static/fonts/BlackedOut-Regular.otf').arrayBuffer();
		const svg = renderBrandSvg({ ...base, line2: 'ÄÖÜß g', fontBuffer, outlineText: true });
		const baselines = [...svg.matchAll(/<path d="[^"]*" fill="#f2fbff"/g)].length;
		expect(baselines).toBeGreaterThan(0);
		expect(svg).toContain('viewBox="0 0 1600 900"');
	});
});
