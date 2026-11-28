import { error } from '@sveltejs/kit';
import { LEGAL_SLUGS } from '#lib/legal.js';
import { loadLegal } from '#lib/server/legal.js';

export const entries = () => LEGAL_SLUGS.map((slug) => ({ slug }));

export const load = ({ params }) => {
	if (!LEGAL_SLUGS.includes(params.slug as (typeof LEGAL_SLUGS)[number])) {
		error(404, 'This legal page does not exist.');
	}
	const de = loadLegal(params.slug, 'de');
	const en = loadLegal(params.slug, 'en');
	if (!de || !en) error(404, 'This legal page does not exist.');
	return { slug: params.slug, docs: { de, en } };
};
