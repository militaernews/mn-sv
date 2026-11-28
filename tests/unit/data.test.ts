import { describe, expect, test } from 'bun:test';
import { DOCS } from '../../src/lib/docs.js';
import { CHANNELS, PROJECTS } from '../../src/lib/projects.js';

describe('site data', () => {
	test('documentation slugs are unique and bilingual', async () => {
		const slugs = DOCS.map((doc) => doc.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const doc of DOCS) {
			expect(doc.href.startsWith('/')).toBe(true);
			expect(doc.text.de.name.length).toBeGreaterThan(0);
			expect(doc.text.en.name.length).toBeGreaterThan(0);
			expect(await Bun.file(`src/lib/docs/${doc.slug}.md`).exists()).toBe(true);
			expect(await Bun.file(`src/lib/docs/en/${doc.slug}.md`).exists()).toBe(true);
		}
	});

	test('project ids are unique and every project has both languages', () => {
		const ids = PROJECTS.map((project) => project.id);
		expect(new Set(ids).size).toBe(ids.length);
		for (const project of PROJECTS) {
			expect(project.href.length).toBeGreaterThan(0);
			for (const lang of ['de', 'en'] as const) {
				const text = project.text[lang];
				expect(text.name.length).toBeGreaterThan(0);
				expect(text.cta.length).toBeGreaterThan(0);
			}
		}
	});

	test('app subpages have native route files', async () => {
		for (const route of ['viz', 'geo', 'charts']) {
			expect(await Bun.file(`src/routes/${route}/+page.svelte`).exists()).toBe(true);
		}
	});

	test('channels cover both UI languages', () => {
		expect(CHANNELS.length).toBeGreaterThan(0);
		for (const channel of CHANNELS) {
			expect(channel.language.de.length).toBeGreaterThan(0);
			expect(channel.language.en.length).toBeGreaterThan(0);
		}
	});
});
