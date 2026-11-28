import { afterAll, beforeAll, describe, expect, test } from 'bun:test';

const port = 5200 + Math.floor(Math.random() * 600);
const origin = `http://127.0.0.1:${port}`;
let server: ReturnType<typeof Bun.spawn> | undefined;

const request = (path: string, init?: RequestInit) =>
	fetch(`${origin}${path}`, { ...init, signal: AbortSignal.timeout(30_000) });

beforeAll(async () => {
	server = Bun.spawn(['bun', 'run', 'dev', '--', '--port', String(port), '--host', '127.0.0.1'], {
		cwd: process.cwd(),
		stdout: 'ignore',
		stderr: 'ignore'
	});
	for (let attempt = 0; attempt < 80; attempt++) {
		try {
			const response = await fetch(origin, { signal: AbortSignal.timeout(1000) });
			if (response.ok) return;
		} catch {
			// Server not listening yet.
		}
		await Bun.sleep(250);
	}
	throw new Error('Dev server did not become ready');
});

afterAll(() => {
	server?.kill();
});

describe('site routes', () => {
	test('home page renders the brand and hero', async () => {
		const response = await request('/');
		expect(response.status).toBe(200);
		expect(await response.text()).toContain('MilitärNews');
	});

	test('app subpages are served by this app', async () => {
		for (const route of ['/viz', '/geo', '/charts']) {
			const response = await request(route);
			expect(response.status).toBe(200);
			expect((await response.text()).length).toBeGreaterThan(500);
		}
	});

	test('docs, brand and changelog render', async () => {
		for (const route of ['/docs', '/brand', '/changelog', '/settings']) {
			const response = await request(route);
			expect(response.status).toBe(200);
		}
	});

	test('admin stats reject unauthenticated requests', async () => {
		const response = await request('/api/admin/stats');
		expect(response.status).toBe(403);
	});

	test('brand render returns editable SVG and a real PNG', async () => {
		const response = await request('/api/brand/render', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				line1: 'MILITÄR',
				line2: 'NEWS',
				subline: 'Ä–g',
				accent: '#2ec5ff',
				font: 'blackout'
			})
		});
		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data.svg).toContain('<text');
		expect(data.svgUrl.startsWith('data:image/svg+xml;base64,')).toBe(true);
		const png = Buffer.from(data.pngUrl.split(',')[1] ?? '', 'base64');
		expect(png.subarray(1, 4).toString()).toBe('PNG');
		expect(png.length).toBeGreaterThan(1000);
	});
});
